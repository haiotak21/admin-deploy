import { SubscriptionResponse } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

type Period = "current_month" | "last_30d";

async function fetchSubscriptions() {
  const res = await fetch("/api/revenue/subscriptions");
  if (!res.ok) throw new Error("Failed to fetch subscriptions");
  return res.json();
}

async function fetchTransactions(period: Period) {
  const res = await fetch(`/api/revenue/transactions?period=${period}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export const useSubscriptions = () => {
  return useQuery<SubscriptionResponse[]>({
    queryKey: ["revenue", "subscriptions"],
    queryFn: fetchSubscriptions,
    select: (data) =>
      data.map((sub) => ({
        name: sub.name,
        users:
          typeof sub.users === "number" ? sub.users : parseInt(sub.users, 10),
        revenue:
          typeof sub.revenue === "number"
            ? sub.revenue
            : parseFloat(sub.revenue),
        growth: sub.growth,
        currency: sub.currency || "USD",
      })),
  });
};

export const useTransactions = (period: Period = "current_month") => {
  return useQuery({
    queryKey: ["revenue", "transactions", period],
    queryFn: () => fetchTransactions(period),
  });
};
