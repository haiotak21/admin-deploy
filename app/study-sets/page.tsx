import { Card, Title } from '@tremor/react';
import { BookOpen, Users, Star, Clock } from 'lucide-react';

const studySets = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    subject: 'Mathematics',
    creator: 'Jane Smith',
    terms: 50,
    views: 2500,
    rating: 4.8,
    status: 'Published'
  },
  // Add more sample study sets...
];

export default function StudySetManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Study Set Management</h1>
        <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Create Study Set
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#7928CA] bg-opacity-20 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#7928CA]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">895</p>
              <p className="text-gray-400">Total Sets</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#36B37E] bg-opacity-20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-[#36B37E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">15.2K</p>
              <p className="text-gray-400">Total Views</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#FF0080] bg-opacity-20 p-3 rounded-lg">
              <Star className="h-6 w-6 text-[#FF0080]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.7</p>
              <p className="text-gray-400">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-[#111C44] border-[#1B254B]">
        <div className="flex justify-between items-center mb-6">
          <Title className="text-white">Study Set List</Title>
          <div className="relative">
            <input
              type="text"
              placeholder="Search study sets..."
              className="bg-[#1B254B] text-white px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#7928CA]"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 border-b border-[#1B254B]">
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Subject</th>
                <th className="text-left py-3 px-4">Creator</th>
                <th className="text-left py-3 px-4">Terms</th>
                <th className="text-left py-3 px-4">Views</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studySets.map((set) => (
                <tr key={set.id} className="border-b border-[#1B254B] text-white">
                  <td className="py-3 px-4">{set.title}</td>
                  <td className="py-3 px-4">{set.subject}</td>
                  <td className="py-3 px-4">{set.creator}</td>
                  <td className="py-3 px-4">{set.terms}</td>
                  <td className="py-3 px-4">{set.views.toLocaleString()}</td>
                  <td className="py-3 px-4">⭐ {set.rating}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      set.status === 'Published' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {set.status}
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