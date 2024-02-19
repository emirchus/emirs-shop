import { Breadcum } from '@/components/breadcum';
import { Sidebar, Topbar } from '@/components/dashboard';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Emir's Dashboard",
  description: 'A dashboard made with Next.js and TailwindCSS'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex h-screen w-full flex-row overflow-hidden'>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            background: 'hsl(var(--muted))',
            color: 'hsl(var(--foreground))',
            border: '2px solid hsl(var(--border))'
          },
          position: 'top-right',
          iconTheme: {
            primary: 'hsl(var(--primary))',
            secondary: 'hsl(var(--secondary))'
          }
        }}
      />
      <Sidebar />
      <div className='max-h-screen w-full flex-1 flex-col overflow-auto'>
        <Topbar />
        <div className='p-4 py-2'>
          <Breadcum />
        </div>
        <div className='pb-5'>{children}</div>
      </div>
    </main>
  );
}
