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

// export const useSubscriptions = () => {
//   return useQuery<SubscriptionResponse[]>({
//     queryKey: ["revenue", "subscriptions"],
//     queryFn: fetchSubscriptions,
//     select: (data) =>
//       data.map((sub) => ({
//         name: sub.name,
//         users:
//           typeof sub.users === "number" ? sub.users : parseInt(sub.users, 10),
//         revenue:
//           typeof sub.revenue === "number"
//             ? sub.revenue
//             : parseFloat(sub.revenue),
//         growth: sub.growth,
//         currency: sub.currency || "USD",
//       })),
//   });
// };

export const useSubscriptions = () => {
  return useQuery<SubscriptionResponse, Error, SubscriptionResponse>({
    queryKey: ["revenue", "subscriptions"],
    queryFn: fetchSubscriptions,
    // Preserve the original structure while ensuring type safety
    select: (data) => ({
      totalUsers: data.totalUsers,
      totalRevenue: data.totalRevenue,
      growth: data.growth,
      tiers: data.tiers.map((tier) => ({
        name: tier.name,
        users:
          typeof tier.users === "number"
            ? tier.users
            : parseInt(tier.users as any, 10),
        revenue:
          typeof tier.revenue === "number"
            ? tier.revenue
            : parseFloat(tier.revenue as any),
        growth: tier.growth,
        currency: tier.currency || "USD",
      })),
    }),
  });
};

export const useTransactions = (period: Period = "current_month") => {
  return useQuery({
    queryKey: ["revenue", "transactions", period],
    queryFn: () => fetchTransactions(period),
  });
};
