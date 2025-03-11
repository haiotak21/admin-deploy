import { Card, Title } from '@tremor/react';
import { BookOpen, FileText, Brain, GraduationCap, Plus } from 'lucide-react';

const resourceStats = [
  {
    title: 'Total Resources',
    value: '5.4K',
    change: '+15.3%',
    icon: BookOpen,
    color: 'text-[#00A8FF]'
  },
  {
    title: 'Study Materials',
    value: '2.1K',
    change: '+8.1%',
    icon: FileText,
    color: 'text-[#7928CA]'
  },
  {
    title: 'Practice Tests',
    value: '1.8K',
    change: '+12.4%',
    icon: Brain,
    color: 'text-[#FF0080]'
  },
  {
    title: 'Video Tutorials',
    value: '1.5K',
    change: '+9.7%',
    icon: GraduationCap,
    color: 'text-[#36B37E]'
  }
];

const resources = [
  {
    id: 1,
    title: 'Advanced Mathematics Course',
    type: 'Course Material',
    author: 'Dr. Sarah Johnson',
    downloads: 1250,
    rating: 4.8,
    status: 'Published'
  },
  {
    id: 2,
    title: 'Programming Fundamentals',
    type: 'Video Tutorial',
    author: 'John Smith',
    downloads: 980,
    rating: 4.6,
    status: 'Published'
  }
];

export default function ResourcesManagement() {
  return (
    <div className="space-y-6 bg-gray-50 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources Management</h1>
        <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resourceStats.map((stat) => (
          <div key={stat.title} className="stats-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-semibold mt-1 text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-opacity-20 ${stat.color} bg-white`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-[#ffff] border-[#1B254B]">
        <div className="flex justify-between items-center mb-6">
          <Title className="text-gray-900 mb-4">Resource List</Title>
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#7928CA] focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-900 border-b border-[#4b2e1b]">
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Author</th>
                <th className="text-left py-3 px-4">Downloads</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id} className="border-b border-[#ffff] text-gray-900">
                  <td className="py-3 px-4">{resource.title}</td>
                  <td className="py-3 px-4">{resource.type}</td>
                  <td className="py-3 px-4">{resource.author}</td>
                  <td className="py-3 px-4">{resource.downloads.toLocaleString()}</td>
                  <td className="py-3 px-4">⭐ {resource.rating}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-700/20 text-green-700">
                      {resource.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-[#7928CA] hover:text-[#FF0080] transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}