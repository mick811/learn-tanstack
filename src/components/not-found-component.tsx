import { Link } from '@tanstack/react-router'

export function NotFoundComponent() {
  return (
    <div className='min-h-screen text-white p-8 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] space-y-8'>
      <div className='flex flex-col gap-4'>
        <p className='text-gray-300'>not found</p>
        <p className='text-sm text-gray-400'>this page was not found</p>
        <Link 
          to='/' 
          className='w-fit text-sm text-gray-400 hover:text-white hover:underline transition-colors'
        >
          go back home
        </Link>
      </div>
    </div>
  )
}
