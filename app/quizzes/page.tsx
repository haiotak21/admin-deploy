import { Card, Title } from '@tremor/react';
import { Brain, CheckCircle, XCircle, Clock } from 'lucide-react';

const quizzes = [
  {
    id: 1,
    title: 'Introduction to JavaScript',
    subject: 'Programming',
    creator: 'John Doe',
    questions: 25,
    timeLimit: 30,
    attempts: 1250,
    avgScore: 78,
    status: 'Active'
  },
  // Add more sample quizzes...
];

export default function QuizManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Quiz Management</h1>
        <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Create Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#7928CA] bg-opacity-20 p-3 rounded-lg">
              <Brain className="h-6 w-6 text-[#7928CA]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1.2K</p>
              <p className="text-gray-400">Total Quizzes</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#36B37E] bg-opacity-20 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-[#36B37E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">85%</p>
              <p className="text-gray-400">Completion Rate</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="bg-[#FF0080] bg-opacity-20 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-[#FF0080]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">15m</p>
              <p className="text-gray-400">Avg. Duration</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-[#111C44] border-[#1B254B]">
        <div className="flex justify-between items-center mb-6">
          <Title className="text-white">Quiz List</Title>
          <div className="relative">
            <input
              type="text"
              placeholder="Search quizzes..."
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
                <th className="text-left py-3 px-4">Questions</th>
                <th className="text-left py-3 px-4">Time Limit</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b border-[#1B254B] text-white">
                  <td className="py-3 px-4">{quiz.title}</td>
                  <td className="py-3 px-4">{quiz.subject}</td>
                  <td className="py-3 px-4">{quiz.creator}</td>
                  <td className="py-3 px-4">{quiz.questions}</td>
                  <td className="py-3 px-4">{quiz.timeLimit} min</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      quiz.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {quiz.status}
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