export interface RevenueMetrics {
    total: number;
    growth: string;
    stats: {
      id: string;
      title: string;
      value: number;
      change: string;
      trend: 'up' | 'down';
      timeframe: string;
      currency?: string;
    }[];
  }
  
  export interface RevenueTrends {
    total: number;
    growth: string;
    breakdown: {
      date: string;
      subscriptions: number;
      one_time: number;
      premium_content: number;
      currency: string;
      growth: string;
    }[];
  }
  
  export interface SubscriptionTransaction {
    id: string;
    type: string;
    customer: {
      name: string;
      email: string;
    };
    amount: number;
    date: string;
    status: string;
    currency: string;
  }
  
  export interface RevenueSubscriptions {
    totalSubscriptions: number;
    currentPage: number;
    totalPages: number;
    results: SubscriptionTransaction[];
  }
  
  export interface RevenueOverviewResponse {
    metrics: RevenueMetrics;
    trends: RevenueTrends;
    subscriptions: RevenueSubscriptions;
    timestamp: string;
  }