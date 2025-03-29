import { Card, Title } from '@tremor/react';
import { FileText, Users, Star, Clock } from 'lucide-react';

const flashcards = [
  {
    id: 1,
    title: 'Spanish Vocabulary',
    subject: 'Languages',
    creator: 'Maria Garcia',
    cards: 100,
    reviews: 1500,
    rating: 4.9,
    status: 'Published'
  },
];

export default function FlashcardManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Flashcard Management</h1>
        <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Create Flashcard Set
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#7928CA] bg-opacity-20 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-[#7928CA]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3.4K</p>
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
              <p className="text-2xl font-bold text-white">25.6K</p>
              <p className="text-gray-400">Total Reviews</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#FF0080] bg-opacity-20 p-3 rounded-lg">
              <Star className="h-6 w-6 text-[#FF0080]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-gray-400">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-[#111C44] border-[#1B254B]">
        <div className="flex justify-between items-center mb-6">
          <Title className="text-white">Flashcard Sets</Title>
          <div className="relative">
            <input
              type="text"
              placeholder="Search flashcards..."
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
                <th className="text-left py-3 px-4">Cards</th>
                <th className="text-left py-3 px-4">Reviews</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flashcards.map((set) => (
                <tr key={set.id} className="border-b border-[#1B254B] text-white">
                  <td className="py-3 px-4">{set.title}</td>
                  <td className="py-3 px-4">{set.subject}</td>
                  <td className="py-3 px-4">{set.creator}</td>
                  <td className="py-3 px-4">{set.cards}</td>
                  <td className="py-3 px-4">{set.reviews.toLocaleString()}</td>
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