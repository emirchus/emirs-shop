import { Footer } from '@/components/footer';
import { Header } from '@/components/store/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Emir's Shop",
  description: 'A shop made with Next.js and TailwindCSS',
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://i.imgur.com/aCtfpcm.png'
      }
    ]
  },
  keywords: [
    'emir store',
    'emir',
    'emirs store',
    'emirs',
    'emir ali store',
    'la tienda de emir',
    'https://github.com/emirchus',
    'https://www.linkedin.com/in/emir-ali-31aa711ab/'
  ]
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
