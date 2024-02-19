import { Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className='mx-auto flex w-2/3 flex-col p-5'>
      <div className='flex items-center space-x-2 text-sm text-gray-500'>
        <div className='flex flex-row items-center justify-start'>
          <Skeleton className='h-5 w-12' />
          <span className='ml-2 text-xs'>{'>'}</span>
        </div>
        <div className='flex flex-row items-center justify-start'>
          <Skeleton className='h-5 w-16' />
          <span className='ml-2 text-xs'>{'>'}</span>
        </div>
        <div className='flex flex-row items-center justify-start'>
          <Skeleton className='h-5 w-24' />
        </div>
      </div>
      <div className='grod-cols-1 mt-8 grid w-full gap-10 md:grid-cols-2'>
        <div className='flex flex-col'>
          <Skeleton className='h-[500px] w-full' />
        </div>
        <div className='flex h-full w-full flex-col pl-8 space-x-4 md:space-y-4 md:space-x-0'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-6 w-1/4' />
          <hr className='h-1 w-full bg-border rounded-full' />
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-1/2 w-full' />
        </div>
      </div>
    </div>
  );
}
