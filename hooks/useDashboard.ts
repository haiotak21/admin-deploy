import { useQuery } from "@tanstack/react-query";
import {
  DashboardMetric,
  TrendData,
  SubscriptionResponse,
} from "@/types/dashboard";

async function fetchDashboard() {
  const res = await fetch("/api/dashboard/overview");
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json() as Promise<{ metrics: DashboardMetric[] }>;
}

async function fetchTrends(type: "user" | "revenue") {
  const res = await fetch(`/api/dashboard/trends?type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch trends");
  return res.json() as Promise<TrendData>;
}

async function fetchSubscriptions() {
  const res = await fetch("/api/revenue/subscriptions");
  if (!res.ok) throw new Error("Failed to fetch subscriptions");
  return res.json() as Promise<SubscriptionResponse>;
}

export const useDashboard = () => {
  return useQuery<{ metrics: DashboardMetric[] }, Error>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
};

export const useTrends = (type: "user" | "revenue") => {
  return useQuery<TrendData, Error>({
    queryKey: ["trends", type],
    queryFn: () => fetchTrends(type),
  });
};

export const useSubscriptions = () => {
  return useQuery<SubscriptionResponse, Error>({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });
};
