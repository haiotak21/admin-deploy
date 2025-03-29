"use client";

import { Card, Title, LineChart, BarChart } from '@tremor/react';
import { Users, Brain, BookOpen, GraduationCap, DollarSign, Clock, Book, Award, TrendingUp } from 'lucide-react';
import { useDashboard, useTrends, useSubscriptions } from '@/hooks/useDashboard';
import { DataLoader } from '@/components/DataLoader';


// Mapping between metric IDs and display properties
const METRIC_CONFIG = {
  total_users: {
    title: 'Total Users',
    icon: Users,
    color: 'from-[#7928CA] to-[#FF0080]',
    formatter: (value: number) => `${(value / 1000).toFixed(1)}K`
  },
  active_quizzes: {
    title: 'Active Quizzes',
    icon: Brain,
    color: 'from-[#FF0080] to-[#7928CA]',
    formatter: (value: number) => `${(value / 1000).toFixed(1)}K`
  },
  total_flashcards: {
    title: 'Flashcards',
    icon: BookOpen,
    color: 'from-[#7928CA] to-[#FF0080]',
    formatter: (value: number) => `${(value / 1000).toFixed(1)}K`
  },
  total_study_sets: {
    title: 'Study Sets',
    icon: GraduationCap,
    color: 'from-[#FF0080] to-[#7928CA]',
    formatter: (value: number) => value.toLocaleString()
  },
  monthly_revenue: {
    title: 'Monthly Revenue',
    icon: DollarSign,
    color: 'from-[#7928CA] to-[#FF0080]',
    formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`
  },
  active_users: {
    title: 'Active Users',
    icon: Users,
    color: 'from-[#FF0080] to-[#7928CA]',
    formatter: (value: number) => `${(value / 1000).toFixed(1)}K`
  },
  arpu: {
    title: 'Avg Revenue Per User',
    icon: DollarSign,
    color: 'from-[#7928CA] to-[#FF0080]',
    formatter: (value: number) => `$${value.toFixed(2)}`
  },
  total_content_sets: {
    title: 'Content Sets',
    icon: Book,
    color: 'from-[#FF0080] to-[#7928CA]',
    formatter: (value: number) => value.toLocaleString()
  },
  avg_study_time: {
    title: 'Avg. Study Time',
    icon: Clock,
    color: 'from-[#7928CA] to-[#FF0080]',
    formatter: (value: number) => `${value} mins`
  },
  completion_rate: {
    title: 'Completion Rate',
    icon: Award,
    color: 'from-[#FF0080] to-[#7928CA]',
    formatter: (value: number) => `${value}%`
  }
};


export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useDashboard();
  const { data: userTrends } = useTrends('user');
  const { data: revenueTrends } = useTrends('revenue');
  const { data: subscriptions } = useSubscriptions();

  return (
    <DataLoader isLoading={isLoading} error={error}>
      <div className="space-y-6 bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Livquiz dashboard</h1>
            <p className="text-gray-600">Livquiz Analytics Dashboard</p>
          </div>
          <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData?.metrics.map((metric) => {
            const config = METRIC_CONFIG[metric.id as keyof typeof METRIC_CONFIG];
            if (!config) return null;

            return (
              <div key={metric.id} className="stats-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{config.title}</p>
                    <p className="text-2xl font-semibold mt-1 text-gray-900">
                      {config.formatter(metric.value)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${config.color}`}>
                    <config.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change >= 0 ? '' : ''}{metric.change}%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">vs last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#ffff] border-[#1B254B]">
            <Title className="text-gray-900 mb-4">Revenue Trend</Title>
            <span className="text-3xl font-bold text-gray-900 mb-4">${(revenueTrends?.total || 0).toLocaleString()}</span>
            <span className="text-green-700 text-sm ml-3 bg-green-900/20 px-2 py-1 rounded">{revenueTrends?.growth}</span>
            <LineChart
              data={revenueTrends?.data || []}
              index="month"
              categories={['value']}
              colors={['#7928CA']}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              showLegend={false}
              className="h-72 mt-4"
            />
          </Card>

          <Card className="bg-[#ffff] border-[#1B254B]">
            <Title className="text-gray-900 mb-4">User Growth</Title>
            {(userTrends?.total || 0).toLocaleString()} users
            <span className="text-green-700 text-sm ml-3 bg-green-600/20 px-2 py-1 rounded"> {userTrends?.growth}</span>
            <BarChart
              data={userTrends?.data || []}
              index="month"
              categories={['value']}
              colors={['#FF0080']}
              valueFormatter={(value) => value.toLocaleString()}
              className="h-72"
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#ffff] border-[#1B254B]">
            <Title className="text-gray-900 mb-4">Revenue by Subscription Tier</Title>
            <span className="text-3xl font-bold text-gray-900 mb-4"> ${(subscriptions?.totalRevenue || 0).toLocaleString()}</span>
            <span className="text-green-700 text-sm ml-3 bg-green-600/20 px-2 py-1 rounded">{subscriptions?.growth}</span>
            <BarChart
              data={subscriptions?.tiers || []}
              index="tier"
              categories={['revenue', 'users']}
              colors={['#7928CA', '#36B37E']}
              valueFormatter={(value) => `$${value.toLocaleString()}`}
              className="h-72"
            />
          </Card>

          <Card className="bg-white border border-gray-200">
            <Title className="text-gray-900 mb-4">Subscription Tiers</Title>
            <div className="space-y-6 mt-4">
              {subscriptions?.tiers.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between p-4 bg-[#3f3a75] rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                    <p className="text-gray-400">{tier.users.toLocaleString()} users</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500">{tier.growth}</span>
                    <TrendingUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DataLoader>

  );
}
