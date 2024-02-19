import { Skeleton } from '@/components/ui';

export default function LoadingPage() {
  return (
    <div className='mx-auto flex w-2/3 flex-col p-5'>
      <div className='grod-cols-1 mt-8 grid w-full gap-10 md:grid-cols-2'>
        <div className='flex flex-col'>
          <Skeleton className='h-[500px] w-full' />
        </div>
        <div className='flex h-full w-full flex-col space-x-4 pl-8 md:space-x-0 md:space-y-4'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-6 w-1/4' />
          <hr className='h-1 w-full rounded-full bg-border' />
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-1/2 w-full' />
        </div>
      </div>
    </div>
  );
}
