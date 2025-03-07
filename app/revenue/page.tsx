import { Card, Title, BarChart } from '@tremor/react';
import { DollarSign, TrendingUp, Users, CreditCard, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const revenueStats = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+12.3%',
    timeframe: 'vs last month',
    icon: DollarSign,
    trend: 'up',
    color: 'text-[#36B37E]'
  },
  {
    title: 'Active Subscriptions',
    value: '2,431',
    change: '+8.1%',
    timeframe: 'vs last month',
    icon: Users,
    trend: 'up',
    color: 'text-[#7928CA]'
  },
  {
    title: 'Avg. Transaction',
    value: '$28.50',
    change: '-2.4%',
    timeframe: 'vs last month',
    icon: CreditCard,
    trend: 'down',
    color: 'text-[#FF0080]'
  },
  {
    title: 'One-time Purchases',
    value: '384',
    change: '+5.7%',
    timeframe: 'vs last month',
    icon: ShoppingCart,
    trend: 'up',
    color: 'text-[#00A8FF]'
  }
];

const revenueData = [
  {
    date: '2023-01',
    Subscriptions: 12500,
    'One-time': 4300,
    'Premium Content': 2100
  },
  {
    date: '2023-02',
    Subscriptions: 14200,
    'One-time': 4800,
    'Premium Content': 2400
  },
  {
    date: '2023-03',
    Subscriptions: 15800,
    'One-time': 5200,
    'Premium Content': 2900
  },
  {
    date: '2023-04',
    Subscriptions: 16900,
    'One-time': 5600,
    'Premium Content': 3200
  },
  {
    date: '2023-05',
    Subscriptions: 18200,
    'One-time': 6100,
    'Premium Content': 3600
  },
  {
    date: '2023-06',
    Subscriptions: 19500,
    'One-time': 6500,
    'Premium Content': 4100
  }
];

export default function RevenueDashboard() {
  return (
    <div className="space-y-6 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Revenue Dashboard</h1>
        <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat) => (
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
              {stat.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-700 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-700 mr-1" />
              )}
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">{stat.timeframe}</span>
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-[#f2f2f4] border-[#1B254B]">
        <Title className="text-gray-900 mb-4">Revenue Trends</Title>
        <BarChart
          data={revenueData}
          index="date"
          categories={['Subscriptions', 'One-time', 'Premium Content']}
          colors={['#7928CA', '#FF0080', '#36B37E']}
          className="h-72"
        />
      </Card>

      <Card className="bg-[#f2f2f4] border-[#1B254B]">
        <Title className="text-gray-900 mb-4">Recent Transactions</Title>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-900 border-b border-[#1B254B]">
                <th className="text-left py-3 px-4">Transaction ID</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#060914] text-gray-900">
                <td className="py-3 px-4">#TRX-123456</td>
                <td className="py-3 px-4">Subscription</td>
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">$29.99</td>
                <td className="py-3 px-4">2023-09-15</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-700/20 text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[#060914] text-gray-900">
                <td className="py-3 px-4">#TRX-123457</td>
                <td className="py-3 px-4">One-time</td>
                <td className="py-3 px-4">Jane Smith</td>
                <td className="py-3 px-4">$49.99</td>
                <td className="py-3 px-4">2023-09-15</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-700/20 text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}