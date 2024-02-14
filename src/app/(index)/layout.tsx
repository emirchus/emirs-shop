import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Suspense } from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Suspense>{children}</Suspense>
      <Footer />
    </>
  );
}
