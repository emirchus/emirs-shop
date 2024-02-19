export default function Loading() {
  return (
    <div className='h-screen w-full'>
      <div className='fixed left-0 top-0 h-screen w-full bg-muted/80 z-10'>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2'>
          <svg
            className='-ml-1 mr-3 h-5 w-5 animate-spin text-primary-foreground'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
