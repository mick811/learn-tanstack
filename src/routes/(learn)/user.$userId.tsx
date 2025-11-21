import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { ErrorComponent } from '../../components/error-component'
import { NotFoundComponent } from '../../components/not-found-component'

export const Route = createFileRoute('/(learn)/user/$userId')({
    component: RouteComponent,
    loader: async ({ params }) => {
        const user = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${params.userId}`
        )
        return user.data
    },
    errorComponent: ({ error }) => <ErrorComponent error={error} />,
    notFoundComponent: () => <NotFoundComponent />,
})

function RouteComponent() {
    const user = Route.useLoaderData()

    const navigate = useNavigate()

    return (
        <div className='min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-12 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] space-y-4 sm:space-y-6 md:space-y-8'>
            <div className='flex flex-col gap-2 sm:gap-3'>
                <p className='text-sm sm:text-base md:text-lg lg:text-xl'>User ID: {user.id}</p>
                <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={user.id}
                    placeholder="Enter user ID"
                    className="w-full sm:w-48 md:w-64 lg:w-80 rounded bg-[#1e222a] border border-gray-600 px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base md:text-lg text-white outline-none focus:border-gray-500"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            const value = (e.target as HTMLInputElement).value
                            if (value && !isNaN(Number(value))) {
                                navigate({ to: '/user/$userId', params: { userId: value } })
                            }
                        }
                    }}
                />
            </div>

            <pre className="bg-[#282c34] border border-[#16181d] rounded p-3 sm:p-4 md:p-6 text-[10px] sm:text-xs md:text-sm lg:text-base font-mono text-zinc-100 whitespace-pre-wrap wrap-break-word overflow-x-auto max-w-full">
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    )
}
