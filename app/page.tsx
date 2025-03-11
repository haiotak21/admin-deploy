import { Card, Title, LineChart, BarChart } from '@tremor/react';
import { Users, Brain, BookOpen, GraduationCap, DollarSign, Clock, Book, Award, TrendingUp } from 'lucide-react';


const overviewStats = [
  {
    title: 'Total Users',
    value: '23.6K',
    change: '+12.3%',
    icon: Users,
    color: 'from-[#7928CA] to-[#FF0080]'
  },
  {
    title: 'Active Quizzes',
    value: '1.2K',
    change: '+8.1%',
    icon: Brain,
    color: 'from-[#FF0080] to-[#7928CA]'
  },
  {
    title: 'Flashcards',
    value: '3.4K',
    change: '+15.4%',
    icon: BookOpen,
    color: 'from-[#7928CA] to-[#FF0080]'
  },
  {
    title: 'Study Sets',
    value: '892',
    change: '+7.2%',
    icon: GraduationCap,
    color: 'from-[#FF0080] to-[#7928CA]'
  },
  {
    title: 'Monthly Revenue',
    value: '$80,000',
    change: '+12%',
    icon: DollarSign,
    color: 'from-[#7928CA] to-[#FF0080]'
  },
  {
    title: 'Active Users',
    value: '5,200',
    change: '+8%',
    icon: Users,
    color: 'from-[#FF0080] to-[#7928CA]'
  },
  {
    title: 'Average Revenue Per User',
    value: '$33.33',
    change: '-2.1%',
    trend: 'down',
    icon: DollarSign,
    color: 'from-[#7928CA] to-[#FF0080]'
  },
  {
    title: 'Total Content Sets',
    value: '1,250',
    change: '+5.8%',
    icon: Book,
    color: 'from-[#FF0080] to-[#7928CA]'
  },
  {
    title: 'Avg. Study Time/User',
    value: '45 mins',
    change: '+8.2%',
    icon: Clock,
    color: 'from-[#7928CA] to-[#FF0080]'
  },
  {
    title: 'Completion Rate',
    value: '78%',
    change: '+3.4%',
    icon: Award,
    color: 'from-[#FF0080] to-[#7928CA]'
  }
    
];


const userGrowthData = [
  { month: 'Jan', users: 2800 },
  { month: 'Feb', users: 3200 },
  { month: 'Mar', users: 3800 },
  { month: 'Apr', users: 4200 },
  { month: 'May', users: 4800 },
  { month: 'Jun', users: 5200 }
];

const revenueTrendData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 58000 },
  { month: 'Apr', revenue: 63000 },
  { month: 'May', revenue: 72000 },
  { month: 'Jun', revenue: 80000 }
];

const subscriptionData = [
  {
    tier: 'Basic',
    revenue: 36000,
    users: 1200
  },
  {
    tier: 'Enterprise',
    revenue: 28000,
    users: 800
  }
];

const subscriptionTiers = [
  {
    name: 'Free',
    users: '3,200',
    growth: '+12%'
  },
  {
    name: 'Basic',
    users: '1,500',
    growth: '+8%'
  },
  {
    name: 'Premium',
    users: '500',
    growth: '+15%'
  }
];

export default function Dashboard() {
  return (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.title} className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
            <span className={`text-sm ${stat.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                {stat.change}
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#ffff] border-[#1B254B]">
          <Title className="text-gray-900 mb-4">Revenue Trend</Title>
          <span className="text-3xl font-bold text-gray-900 mb-4">287</span>
              <span className="text-green-700 text-sm ml-3 bg-green-900/20 px-2 py-1 rounded">17.8% ↑</span>
          <LineChart
            data={revenueTrendData}
            index="month"
            categories={['revenue']}
            colors={['#7928CA']}
            showLegend={false}
            yAxisWidth={80}
            className="h-72 mt-4"
          />
        </Card>

        <Card className="bg-[#ffff] border-[#1B254B]">
          <Title className="text-gray-900 mb-4">User Growth</Title>
          <span className="text-3xl font-bold text-gray-900 mb-4">2173 users</span>
              <span className="text-green-700 text-sm ml-3 bg-green-600/20 px-2 py-1 rounded">21.1% ↑</span>
          <BarChart
            data={userGrowthData}
            index="month"
            categories={['users']}
            colors={['#FF0080']}
            showLegend={false}
            className="h-72 mt-4"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#ffff] border-[#1B254B]">
          <Title className="text-gray-900 mb-4">Revenue by Subscription Tier</Title>
          <span className="text-3xl font-bold text-gray-900 mb-4">$20K</span>
              <span className="text-green-700 text-sm ml-3 bg-green-600/20 px-2 py-1 rounded">14.8% ↑</span>
          <BarChart
            data={subscriptionData}
            index="tier"
            categories={['revenue', 'users']}
            colors={['#7928CA', '#36B37E']}
            showLegend={true}
            className="h-72 mt-4"
          />
        </Card>

        <Card className="bg-[#ffff] border-[#1B254B]">
          <Title className="text-gray-900 mb-4">Subscription Tiers</Title>
          <div className="space-y-6 mt-4">
            {subscriptionTiers.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between p-4 bg-[#3f3a75] rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <p className="text-gray-400">{tier.users} users</p>
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
  );
}