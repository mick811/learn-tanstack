import { Link } from '@tanstack/react-router'

export function NotFoundComponent() {
  return (
    <div className='min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-12 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] space-y-4 sm:space-y-6 md:space-y-8'>
      <div className='flex flex-col gap-3 sm:gap-4 md:gap-5'>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium'>Not Found</p>
        <p className='text-sm sm:text-base md:text-lg text-gray-400'>This page was not found</p>
        <Link 
          to='/' 
          className='w-fit text-sm sm:text-base md:text-lg text-gray-400 hover:text-white hover:underline transition-colors'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
