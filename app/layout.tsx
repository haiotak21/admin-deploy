import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Providers } from '@/providers';



export const metadata: Metadata = {
  title: 'LivQuiz Admin Dashboard',
  description: 'Admin dashboard for managing LivQuiz educational platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Providers>
          <div className="flex h-screen bg-[#0B1437]">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F9FAFB]">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}