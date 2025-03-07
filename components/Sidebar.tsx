import Link from 'next/link';
import { 
  LayoutGrid,
  Users,
  DollarSign,
  BookOpen,
  BarChart2,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { 
    icon: LayoutGrid, 
    label: 'Dashboard', 
    href: '/',
    color: 'text-[#7928CA]' 
  },
  { 
    icon: DollarSign, 
    label: 'Revenue', 
    href: '/revenue',
    color: 'text-[#36B37E]' 
  },
  { 
    icon: Users, 
    label: 'Users', 
    href: '/users',
    color: 'text-[#FF0080]'
  },
  { 
    icon: BookOpen, 
    label: 'Resources', 
    href: '/resources',
    color: 'text-[#00A8FF]'
  },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    href: '/analytics',
    color: 'text-[#9B51E0]'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/settings',
    color: 'text-[#8E8E8E]'
  }
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto flex flex-col h-screen">
      <div className="h-16 flex items-center px-6 mb-8">
        <h1 className="text-2xl font-bold gradient-text">LivQuiz</h1>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
          >
            <item.icon className={`w-5 h-5 mr-3 ${item.color} group-hover:text-current transition-colors`} />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <Link
          href="/logout"
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <LogOut className="w-5 h-5 mr-3 text-[#FF0080] group-hover:text-current transition-colors" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
}