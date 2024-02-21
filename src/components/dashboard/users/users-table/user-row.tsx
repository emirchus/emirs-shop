'use client';

import { Button } from '@/components/ui';
import { TableCell } from '@/components/ui/table';
import { getImgurImage } from '@/lib';
import { Edit, ReplyIcon, Trash } from 'lucide-react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { User } from '@/interfaces/user';

interface Props {
  user: User;
  index: number;
}

export const UserRow = ({ user: realUser, index }: Props) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  return (
    <motion.tr
      className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0.1 * index
      }}
      viewport={{ amount: 0 }}
    >
      <TableCell className='font-medium '>
        <div className='flex items-center space-x-2'>
          <div className='h-10 w-10 rounded-md bg-gray-200'>
            <Image
              src={getImgurImage(realUser.avatar)}
              alt={realUser.name}
              width={40}
              height={40}
              className='rounded-md'
            />
          </div>
          <p className='text-primary underline-offset-4 hover:underline'>{realUser.name}</p>
        </div>
      </TableCell>
      <TableCell className='w-[150px]'>
        <p>{realUser.email}</p>
      </TableCell>
      <TableCell className='w-[150px]'>
        <p>{realUser.password}</p>
      </TableCell>
      <TableCell className='space-x-2 text-right'>
        <Button variant={'outline'} size={'icon'} title='share'>
          <Edit size={16} />
        </Button>
        <Button variant={'outline'} size={'icon'} title='duplicate'>
          <ReplyIcon size={16} />
        </Button>
        <Button variant={'outline'} size={'icon'} title='delete'>
          <Trash size={16} />
        </Button>
      </TableCell>
    </motion.tr>
  );
};
