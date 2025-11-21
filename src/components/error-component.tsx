import { useRouter } from '@tanstack/react-router'

interface ErrorComponentProps {
  error: Error
}

export function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <div className='min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-12 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] space-y-4 sm:space-y-6 md:space-y-8'>
      <div className='flex flex-col gap-3 sm:gap-4 md:gap-5'>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium'>Error</p>
        <p className='text-sm sm:text-base md:text-lg text-gray-400'>{error.message}</p>
        <button
          onClick={() => router.invalidate()}
          className='w-fit px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg text-gray-300 hover:text-white border border-gray-700/50 rounded hover:bg-gray-800/30 transition-colors'
        >
          Retry
        </button>
      </div>
    </div>
  )
}
