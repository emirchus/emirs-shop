import { Button } from '@/components/ui';
import { useSession } from '@/hooks/use-session';
import { Bell, Moon, Sun, SunMoonIcon } from 'lucide-react';
import React from 'react';

export const Topbar = async () => {
  const session = await useSession();

  const getDateString = (): [string, string, React.ReactNode] => {
    const date = new Date();

    const hour = date.getHours();

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dateFormat = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    if (hour >= 0 && hour < 12) {
      return ['Good Morning', dateFormat, <SunMoonIcon key={1} size={20} />];
    } else if (hour >= 12 && hour < 18) {
      return ['Good Afternoon', dateFormat, <Sun className='text-yellow-400' key={1} size={20} />];
    } else {
      return ['Good Evening', dateFormat, <Moon key={1} size={20} />];
    }
  };

  const [text, date, icon] = getDateString();

  return (
    <div className='sticky top-0 hidden h-[90px]  scroll-m-0 flex-row items-center justify-between border-b-2 bg-background p-5  md:flex z-10 '>
      <div className='my-auto flex flex-col items-start justify-start'>
        <h1 className='flex flex-row items-center text-2xl font-semibold'>
          {`${text}, ${session.user!.name}`} <span className='ml-2'>{icon}</span>
        </h1>
        <h3 className='text-lg font-light'>{date}</h3>
      </div>

      <div className='my-auto'>
        <Button variant={'outline'} size={'icon'}>
          <Bell size={20} />
        </Button>
      </div>
    </div>
  );
};
