import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  value: number;
  editHref?: string;
}

export const DataCard = ({ icon, title, value, editHref }: Props) => {
  return (
    <Card className='h-full'>
      <CardHeader className='flex-row items-center justify-start'>
        <div className='mr-4 rounded-md bg-accent p-2 text-accent-foreground'>{icon}</div>
        <CardTitle className='my-auto'>{title}</CardTitle>
        {editHref && (
          <>
            <div className='flex flex-1'></div>
            <Link
              href={editHref}
              className='my-auto rounded-md p-1 hover:bg-accent hover:text-accent-foreground'
            >
              <ExternalLink size={20} />
            </Link>
          </>
        )}
      </CardHeader>
      <CardContent>
        <h4 className='text-3xl font-bold'>{value}</h4>
      </CardContent>
    </Card>
  );
};
