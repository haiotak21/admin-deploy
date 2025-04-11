import { SubscriptionResponse } from "@/types/dashboard";
import { RevenueOverviewResponse } from "@/types/revenue";
import {
  QueryObserverResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

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

async function fetchRevenueOverview(
  page: number = 1
): Promise<RevenueOverviewResponse> {
  const res = await fetch(`/api/revenue/overview?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch revenue data");
  return res.json();
}

export const useRevenue = (
  page: number = 1
): QueryObserverResult<RevenueOverviewResponse, Error> => {
  return useQuery({
    queryKey: ["revenue", page],
    queryFn: () => fetchRevenueOverview(page),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

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
