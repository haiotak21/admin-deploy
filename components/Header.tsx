import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-gray-600 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    </header>
  );
}