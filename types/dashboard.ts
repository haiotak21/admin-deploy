export type DashboardMetric = {
  id: string;
  value: number;
  change: number;
};

export type TrendData = {
  total: number;
  growth: string;
  data: {
    month: string;
    value: number;
    change?: string;
  }[];
};

export type SubscriptionTier = {
  name: string;
  users: number;
  revenue: number;
  growth: string;
  currency: string;
};

export type SubscriptionResponse = {
  totalUsers: number;
  totalRevenue: number;
  growth: string;
  tiers: SubscriptionTier[];
};