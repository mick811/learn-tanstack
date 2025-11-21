import { useRouter } from '@tanstack/react-router'

interface ErrorComponentProps {
  error: Error
}

export function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <div className='min-h-screen text-white p-8 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] space-y-8'>
      <div className='flex flex-col gap-4'>
        <p className='text-gray-300'>error</p>
        <p className='text-sm text-gray-400'>{error.message}</p>
        <button
          onClick={() => router.invalidate()}
          className='w-fit px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700/50 rounded hover:bg-gray-800/30 transition-colors'
        >
          retry
        </button>
      </div>
    </div>
  )
}
