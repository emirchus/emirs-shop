import React, { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
}

export const HomeFeature = ({ description, icon, title }: Props) => {
  return (
    <div className='flex flex-row rounded-md border-2 px-5 py-3 shadow-md w-full'>
      <div className='my-auto mr-4'>{icon}</div>
      <div className='my-auto'>
        <h3 className='font-semibold'>{title}</h3>
        <p className='text-muted-foreground line-clamp-2' aria-label={description}>{description}</p>
      </div>
    </div>
  );
};
