'use client';

import { useState, useEffect } from 'react';
import { Card, Title, LineChart, BarChart, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react';
import { Users, UserPlus, UserCog, Award, Clock, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { useUserStats, useUsersList } from '@/hooks/useUsers';
import { DataLoader } from '@/components/DataLoader';
import { format } from 'date-fns';
import { UserMetric, UserRole } from '@/types/users';

const metricIcons = {
  'completed-quizzes': BookOpen,
  'average-score': Award,
  'flashcards-learned': BookOpen,
  'study-time': Clock,
  'total-teachers': UserCog,
  'total-students': Users,
  'active-classrooms': GraduationCap,
  'total-resources': FileText
};

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data: stats, isLoading: statsLoading, error: statsError } = useUserStats();
  const role = activeTab === 0 ? 'student' : 'teacher';
  const { data: usersData, isLoading: usersLoading } = useUsersList(role, page, debouncedSearch);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const renderMetrics = (metrics: UserMetric[] = []) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {metrics?.map((metric) => {
        const Icon = metricIcons[metric.id as keyof typeof metricIcons];
        return (
          <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{metric.label}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900">
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <Icon className="h-6 w-6 text-[#7928CA]" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderUserTable = () => (
    <Card className="bg-white border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-6">
        <Title className="text-gray-900">{role.charAt(0).toUpperCase() + role.slice(1)} List</Title>
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${role}s...`}
            className="bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#7928CA] focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 border-b border-gray-200">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Status</th>
              {role === 'student' ? (
                <>
                  <th className="text-left py-3 px-4">Quizzes Taken</th>
                  <th className="text-left py-3 px-4">Avg. Score</th>
                </>
              ) : (
                <>
                  <th className="text-left py-3 px-4">Classrooms</th>
                  <th className="text-left py-3 px-4">Resources</th>
                </>
              )}
              <th className="text-left py-3 px-4">Last Login</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.data.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 text-gray-700">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                {role === 'student' ? (
                  <>
                    <td className="py-3 px-4">{user.quizzesTaken || 0}</td>
                    <td className="py-3 px-4">{user.avgScore || 'N/A'}</td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{user.classrooms || 0}</td>
                    <td className="py-3 px-4">{user.resources ? `${user.resources}%` : 'N/A'}</td>
                  </>
                )}
                <td className="py-3 px-4">{format(new Date(user.lastLogin), 'MM/dd/yyyy')}</td>
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

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">
          Showing {(page - 1) * 10 + 1} - {Math.min(page * 10, usersData?.total || 0)} of {usersData?.total || 0}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page * 10 >= (usersData?.total || 0)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );

  return (
    <DataLoader isLoading={statsLoading || usersLoading} error={statsError}>
      <div className="space-y-6 bg-gray-50 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>

        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="bg-white border border-gray-200 rounded-lg p-1">
            <Tab className="text-gray-600 py-2 px-4 rounded-md data-[selected]:bg-gray-100">Students</Tab>
            <Tab className="text-gray-600 py-2 px-4 rounded-md data-[selected]:bg-gray-100">Teachers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            {renderMetrics(stats?.students.metrics || [])}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="bg-white border border-gray-200">
                  <Title className="text-gray-900 mb-4">Progress Over Time</Title>
                  <LineChart
                    data={stats?.students.progressOverTime || []}
                    index="month"
                    categories={['quizScore', 'flashcards']}
                    colors={['#00A8FF', '#7928CA']}
                    valueFormatter={(value) => `${value}%`}
                    className="h-72"
                  />
                </Card>

                <Card className="bg-white border border-gray-200">
                  <Title className="text-gray-900 mb-4">Weekly Activity Trends</Title>
                  <div className="space-y-6">
                    {stats?.students.weeklyActivity.map((activity) => (
                      <div key={activity.id} className="space-y-2">
                        <p className="text-gray-900">{activity.metric}</p>
                        <div className="flex items-center">
                          {activity.trend === 'up' ? (
                            <span className="text-green-600 text-3xl">↑</span>
                          ) : (
                            <span className="text-red-600 text-3xl">↓</span>
                          )}
                          <span className={`text-3xl font-bold ml-2 ${
                            activity.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {activity.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="bg-white border border-gray-200 mt-6">
                <Title className="text-gray-900 mb-4">Subject Performance</Title>
                <BarChart
                  data={stats?.students.subjectPerformance || []}
                  index="subject"
                  categories={['score']}
                  colors={['#FF0080']}
                  valueFormatter={(value) => `${value}%`}
                  className="h-72"
                />
              </Card>

              {renderUserTable()}
            </TabPanel>

            <TabPanel>
            {renderMetrics(stats?.teachers?.metrics || [])}

              <Card className="bg-white border border-gray-200 mt-6">
                <Title className="text-gray-900 mb-4">Teacher Activity Trends</Title>
                <LineChart
                  data={stats?.teachers.activityTrends || []}
                  index="month"
                  categories={['activeTeachers', 'contentCreated']}
                  colors={['#00A8FF', '#7928CA']}
                  className="h-72"
                />
              </Card>

              {renderUserTable()}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </DataLoader>
  );
}


// const users = [
//   {
//     id: 1,
//     name: 'haile takele',
//     email: 'haiotak21@gmail.com',
//     role: 'Student',
//     status: 'Active',
//     lastLogin: '2023-09-15T10:30:00',
//     quizzesTaken: 45,
//     averageScore: 85
//   },
//   // Add more sample users...
// ];

// // Student data
// const studentStats = [
//   {
//     title: 'Completed Quizzes',
//     value: '24',
//     change: '+8.2%',
//     icon: Brain,
//     color: 'text-[#7928CA]'
//   },
//   {
//     title: 'Average Score',
//     value: '85%',
//     change: '+3.5%',
//     icon: Award,
//     color: 'text-[#36B37E]'
//   },
//   {
//     title: 'Flashcards Learned',
//     value: '156',
//     change: '+12.4%',
//     icon: BookOpen,
//     color: 'text-[#FF0080]'
//   },
//   {
//     title: 'Study Time',
//     value: '45h',
//     change: '+5.7%',
//     icon: Clock,
//     color: 'text-[#00A8FF]'
//   }
// ];

// // Weekly activity trends for students
// const weeklyActivityData = [
//   {
//     metric: 'Quiz Completion Rate',
//     value: '+12.5%',
//     trend: 'up',
//     description: 'vs last week'
//   },
//   {
//     metric: 'Study Session Duration',
//     value: '+8.3%',
//     trend: 'up',
//     description: 'vs last week'
//   },
//   {
//     metric: 'Flashcard Review Rate',
//     value: '-3.2%',
//     trend: 'down',
//     description: 'vs last week'
//   }
// ];

// // Progress over time data
// const progressData = [
//   {
//     month: 'Jan',
//     'Quiz Score': 75,
//     'Flashcards': 30,
//     formattedQuizScore: '75',
//     formattedFlashcards: '30'
//   },
//   {
//     month: 'Feb',
//     'Quiz Score': 82,
//     'Flashcards': 45,
//     formattedQuizScore: '82',
//     formattedFlashcards: '45'
//   },
//   {
//     month: 'Mar',
//     'Quiz Score': 88,
//     'Flashcards': 75,
//     formattedQuizScore: '88',
//     formattedFlashcards: '75'
//   }
// ];

// // Subject performance data
// const subjectPerformanceData = [
//   {
//     subject: 'Mathematics',
//     score: 92,
//     formattedScore: '92'
//   },
//   {
//     subject: 'Science',
//     score: 85,
//     formattedScore: '85'
//   },
//   {
//     subject: 'History',
//     score: 78,
//     formattedScore: '78'
//   },
//   {
//     subject: 'Languages',
//     score: 88,
//     formattedScore: '88'
//   },
//   {
//     subject: 'Arts',
//     score: 95,
//     formattedScore: '95'
//   }
// ];

// // Teacher data
// const teacherStats = [
//   {
//     title: 'Total Teachers',
//     value: '142',
//     change: '+5.2%',
//     icon: UserCog,
//     color: 'text-[#7928CA]'
//   },
//   {
//     title: 'Total Students',
//     value: '3.2K',
//     change: '+8.7%',
//     icon: Users,
//     color: 'text-[#36B37E]'
//   },
//   {
//     title: 'Active Classrooms',
//     value: '86',
//     change: '+4.3%',
//     icon: GraduationCap,
//     color: 'text-[#FF0080]'
//   },
//   {
//     title: 'Total Resources',
//     value: '1.8K',
//     change: '+12.1%',
//     icon: FileText,
//     color: 'text-[#00A8FF]'
//   }
// ];

// // Teacher activity trends
// const teacherActivityData = [
//   {
//     month: 'Jan',
//     'Active Teachers': 120,
//     'Content Created': 450,
//     formattedActiveTeachers: '120',
//     formattedContentCreated: '450'
//   },
//   {
//     month: 'Feb',
//     'Active Teachers': 130,
//     'Content Created': 520,
//     formattedActiveTeachers: '130',
//     formattedContentCreated: '520'
//   },
//   {
//     month: 'Mar',
//     'Active Teachers': 135,
//     'Content Created': 580,
//     formattedActiveTeachers: '135',
//     formattedContentCreated: '580'
//   },
//   {
//     month: 'Apr',
//     'Active Teachers': 142,
//     'Content Created': 650,
//     formattedActiveTeachers: '142',
//     formattedContentCreated: '650'
//   }
// ];

// export default function UserManagement() {
//   return (
//     <div className="space-y-6 bg-gray-50 p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
//         <button className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white px-4 py-2 rounded-lg flex items-center">
//           <UserPlus className="w-5 h-5 mr-2" />
//           Add User
//         </button>
//       </div>

//       <TabGroup>
//         <TabList className="bg-white border border-gray-200 rounded-lg p-1">
//           <Tab className="text-gray-600 py-2 px-4 rounded-md data-[selected]:bg-gray-100">Students</Tab>
//           <Tab className="text-gray-600 py-2 px-4 rounded-md data-[selected]:bg-gray-100">Teachers</Tab>
//         </TabList>
        
//         <TabPanels>
//           {/* Students Panel */}
//           <TabPanel>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//               {studentStats.map((stat) => (
//                 <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-900">{stat.title}</p>
//                       <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
//                     </div>
//                     <div className={`p-3 rounded-lg bg-opacity-20 ${stat.color} bg-gray-100`}>
//                       <stat.icon className={`h-6 w-6 ${stat.color}`} />
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <span className="text-green-600 text-sm">{stat.change}</span>
//                     <span className="text-gray-500 text-sm ml-2">vs last month</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//               {/* Weekly Activity Trends */}
//               <Card className="bg-white border border-gray-200">
//                 <Title className="text-gray-900 mb-4">Weekly Activity Trends</Title>
//                 <div className="space-y-6">
//                   {weeklyActivityData.map((item) => (
//                     <div key={item.metric} className="space-y-2">
//                       <p className="text-gray-900">{item.metric}</p>
//                       <div className="flex items-center">
//                         {item.trend === 'up' ? (
//                           <span className="text-green-600 text-3xl">↑</span>
//                         ) : (
//                           <span className="text-red-600 text-3xl">↓</span>
//                         )}
//                         <span className={`text-3xl font-bold ml-2 ${
//                           item.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {item.value}
//                         </span>
//                       </div>
//                       <p className="text-gray-500">{item.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </Card>

//               {/* Progress Over Time */}
//               <Card className="bg-white border border-gray-200">
//                 <Title className="text-gray-900 mb-4">Progress Over Time</Title>
//                 <LineChart
//                   data={progressData}
//                   index="month"
//                   categories={['Quiz Score', 'Flashcards']}
//                   colors={['#00A8FF', '#7928CA']}
//                    valueFormatter={(value) => `${value}`}
//                   showLegend={true}
//                   className="h-72"
//                 />
//               </Card>
//             </div>

//             {/* Subject Performance */}
//             <Card className="bg-white border border-gray-200 mt-6">
//               <Title className="text-gray-900 mb-4">Subject Performance</Title>
//               <BarChart
//                 data={subjectPerformanceData}
//                 index="subject"
//                 categories={['score']}
//                 colors={['#FF0080']}
//                 valueFormatter={(value) => `${value}%`}
//                 showLegend={false}
//                 className="h-72"
//               />
//             </Card>

//             {/* User List */}
//             <Card className="bg-white border border-gray-200 mt-6">
//               <div className="flex justify-between items-center mb-6">
//                 <Title className="text-gray-900">Student List</Title>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search students..."
//                     className="bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#7928CA] focus:border-transparent"
//                   />
//                   <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="text-gray-600 border-b border-gray-200">
//                       <th className="text-left py-3 px-4">Name</th>
//                       <th className="text-left py-3 px-4">Email</th>
//                       <th className="text-left py-3 px-4">Status</th>
//                       <th className="text-left py-3 px-4">Quizzes Taken</th>
//                       <th className="text-left py-3 px-4">Avg. Score</th>
//                       <th className="text-left py-3 px-4">Last Login</th>
//                       <th className="text-left py-3 px-4">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.filter(user => user.role === 'Student').map((user) => (
//                       <tr key={user.id} className="border-b border-gray-200 text-gray-700">
//                         <td className="py-3 px-4">{user.name}</td>
//                         <td className="py-3 px-4">{user.email}</td>
//                         <td className="py-3 px-4">
//                           <span className={`px-2 py-1 rounded-full text-xs ${
//                             user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                           }`}>
//                             {user.status}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4">{user.quizzesTaken}</td>
//                         <td className="py-3 px-4">{user.averageScore}%</td>
//                         <td className="py-3 px-4">{new Date(user.lastLogin).toLocaleDateString()}</td>
//                         <td className="py-3 px-4">
//                           <button className="text-[#7928CA] hover:text-[#FF0080] transition-colors">
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           </TabPanel>

//           {/* Teachers Panel */}
//           <TabPanel>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//               {teacherStats.map((stat) => (
//                 <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600">{stat.title}</p>
//                       <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
//                     </div>
//                     <div className={`p-3 rounded-lg bg-opacity-20 ${stat.color} bg-gray-100`}>
//                       <stat.icon className={`h-6 w-6 ${stat.color}`} />
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <span className="text-green-600 text-sm">{stat.change}</span>
//                     <span className="text-gray-500 text-sm ml-2">vs last month</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Teacher Activity Trends */}
//             <Card className="bg-white border border-gray-200 mt-6">
//               <Title className="text-gray-900 mb-4">Teacher Activity Trends</Title>
//               <LineChart
//                 data={teacherActivityData}
//                 index="month"
//                 categories={['Active Teachers', 'Content Created']}
//                 colors={['#00A8FF', '#7928CA']}
//                 valueFormatter={(value) => `${value}`}
//                 showLegend={true}
//                 className="h-72"
//               />
//             </Card>

//             {/* Teacher List */}
//             <Card className="bg-white border border-gray-200 mt-6">
//               <div className="flex justify-between items-center mb-6">
//                 <Title className="text-gray-900">Teacher List</Title>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search teachers..."
//                     className="bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#7928CA] focus:border-transparent"
//                   />
//                   <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="text-gray-600 border-b border-gray-200">
//                       <th className="text-left py-3 px-4">Name</th>
//                       <th className="text-left py-3 px-4">Email</th>
//                       <th className="text-left py-3 px-4">Status</th>
//                       <th className="text-left py-3 px-4">Classrooms</th>
//                       <th className="text-left py-3 px-4">Resources</th>
//                       <th className="text-left py-3 px-4">Last Login</th>
//                       <th className="text-left py-3 px-4">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.filter(user => user.role === 'Student').map((user) => (
//                       <tr key={user.id} className="border-b border-gray-200 text-gray-700">
//                         <td className="py-3 px-4">{user.name}</td>
//                         <td className="py-3 px-4">{user.email}</td>
//                         <td className="py-3 px-4">
//                           <span className={`px-2 py-1 rounded-full text-xs ${
//                             user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                           }`}>
//                             {user.status}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4">{user.quizzesTaken}</td>
//                         <td className="py-3 px-4">{user.averageScore}%</td>
//                         <td className="py-3 px-4">{new Date(user.lastLogin).toLocaleDateString()}</td>
//                         <td className="py-3 px-4">
//                           <button className="text-[#7928CA] hover:text-[#FF0080] transition-colors">
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           </TabPanel>
//         </TabPanels>
//       </TabGroup>
//     </div>
//   );
// }