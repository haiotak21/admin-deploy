import { Card, Title } from '@tremor/react';
import { Bell, Lock, Globe, Palette, Mail, CreditCard } from 'lucide-react';

const settingsSections = [
  {
    title: 'Account Settings',
    icon: Lock,
    color: 'text-[#7928CA]',
    description: 'Manage your account security and preferences'
  },
  {
    title: 'Notifications',
    icon: Bell,
    color: 'text-[#FF0080]',
    description: 'Configure your notification preferences'
  },
  {
    title: 'Appearance',
    icon: Palette,
    color: 'text-[#36B37E]',
    description: 'Customize the look and feel of your dashboard'
  },
  {
    title: 'Billing',
    icon: CreditCard,
    color: 'text-[#00A8FF]',
    description: 'Manage your subscription and billing information'
  },
  {
    title: 'Email Preferences',
    icon: Mail,
    color: 'text-[#9B51E0]',
    description: 'Configure your email notification settings'
  },
  {
    title: 'Language & Region',
    icon: Globe,
    color: 'text-[#FF8A00]',
    description: 'Set your preferred language and regional settings'
  }
];

export default function Settings() {
  return (
    <div className="space-y-6 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <Card key={section.title} className="bg-[#ffffff] border-[#f6f6f6] hover:border-[#3B4363] transition-colors cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg bg-opacity-20 ${section.color} text-gray-900`}>
                <section.icon className={`h-6 w-6 ${section.color}`} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <p className="text-gray-700 mt-1">{section.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}