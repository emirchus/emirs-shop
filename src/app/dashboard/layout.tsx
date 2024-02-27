import { Breadcum } from '@/components/breadcum';
import { Sidebar, Topbar } from '@/components/dashboard';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from '@/hooks/use-session';

export const metadata: Metadata = {
  title: "Emir's Dashboard",
  description: 'A dashboard made with Next.js and TailwindCSS'
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await useSession();

  if(!session.user) return null;

  return (
    <main className='flex h-screen w-full flex-row overflow-hidden bg-primary/20 dark:bg-muted'>
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
      <Sidebar user={session.user}/>
      <div className='h-screen w-full flex-1 p-5 pl-0'>
        <div className='flex  h-full w-full flex-col overflow-hidden rounded-2xl bg-background shadow-md'>
          <Topbar />
          <div className='p-4 py-2'>
            <Breadcum />
          </div>
          <ScrollArea className='max-h-screen '>{children}</ScrollArea>
        </div>
      </div>
    </main>
  );
}
