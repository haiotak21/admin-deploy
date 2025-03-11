import { Card, Title, BarChart, LineChart } from '@tremor/react';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

const analyticsStats = [
  {
    title: 'User Growth',
    value: '+28%',
    description: 'vs last month',
    icon: Users,
    color: 'text-[#7928CA]'
  },
  {
    title: 'Engagement Rate',
    value: '65.4%',
    description: 'Active users',
    icon: Clock,
    color: 'text-[#FF0080]'
  },
  {
    title: 'Conversion Rate',
    value: '12.8%',
    description: 'Trial to paid',
    icon: Target,
    color: 'text-[#36B37E]'
  },
  {
    title: 'Revenue Growth',
    value: '+32%',
    description: 'vs last month',
    icon: TrendingUp,
    color: 'text-[#00A8FF]'
  }
];

const userActivityData = [
  {
    date: '2023-01',
    'Active Users': 2500,
    'New Signups': 800,
    'Premium Users': 400
  },
  {
    date: '2023-02',
    'Active Users': 2800,
    'New Signups': 900,
    'Premium Users': 450
  },
  {
    date: '2023-03',
    'Active Users': 3200,
    'New Signups': 1100,
    'Premium Users': 520
  },
  {
    date: '2023-04',
    'Active Users': 3600,
    'New Signups': 1300,
    'Premium Users': 580
  },
  {
    date: '2023-05',
    'Active Users': 4100,
    'New Signups': 1500,
    'Premium Users': 650
  },
  {
    date: '2023-06',
    'Active Users': 4500,
    'New Signups': 1700,
    'Premium Users': 720
  }
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6 bg-gray-50 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat) => (
          <div key={stat.title} className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-opacity-20 ${stat.color} bg-white`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-400">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-[#ffff] border-[#1B254B]">
        <Title className="text-gray-900 mb-4">User Activity Trends</Title>
        <span className="text-green-700 text-sm ml-3 bg-green-600/20 px-2 py-1 rounded">21.1% ↑</span>
        <LineChart
          data={userActivityData}
          index="date"
          categories={['Active Users', 'New Signups', 'Premium Users']}
          colors={['#7928CA', '#FF0080', '#36B37E']}
          className="h-72"
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#fff] border-[#1B254B]">
          <Title className="text-gray-900 mb-4">User Engagement by Platform</Title>
          <BarChart
            data={[
              { platform: 'Web', users: 4500 },
              { platform: 'Mobile', users: 3800 },
              { platform: 'Tablet', users: 1200 }
            ]}
            index="platform"
            categories={['users']}
            colors={['#7928CA']}
            className="h-64"
          />
        </Card>

        <Card className="bg-[#fff] border-[#1B254B]">
          <Title className="text-gray-900 mb-4">Resource Usage Distribution</Title>
          <BarChart
            data={[
              { type: 'Quizzes', usage: 3200 },
              { type: 'Study Sets', usage: 2800 },
              { type: 'Flashcards', usage: 2400 },
              { type: 'Practice Tests', usage: 1800 }
            ]}
            index="type"
            categories={['usage']}
            colors={['#FF0080']}
            className="h-64"
          />
        </Card>
      </div>
    </div>
  );
}