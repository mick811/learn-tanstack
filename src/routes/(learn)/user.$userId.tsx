import { createFileRoute, notFound } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { ErrorComponent } from '../../components/error-component'
import { NotFoundComponent } from '../../components/not-found-component'

const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      )
      return response.data
    },
  })

export const Route = createFileRoute('/(learn)/user/$userId')({
    component: RouteComponent,
    loader: async ({ context, params }) => {
        const queryOptions = userQueryOptions(params.userId)
        try {
            await context.queryClient.ensureQueryData(queryOptions)
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                throw notFound({ throw: true })
            }
            throw error
        }
    },
    errorComponent: ({ error }) => <ErrorComponent error={error} />,
    notFoundComponent: () => <NotFoundComponent />,
})

function RouteComponent() {
    const { userId } = Route.useParams()
    const { data: user } = useSuspenseQuery(userQueryOptions(userId))

    const navigate = useNavigate()

    return (
        <div className='min-h-screen text-white p-8 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] space-y-8'>
            <div className='flex flex-col gap-2'>
                <p>user id: {user.id}</p>
                <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={user.id}
                    placeholder="enter user id"
                    className="w-32 rounded bg-[#1e222a] border border-gray-600 px-2 py-1 text-sm text-white outline-none focus:border-gray-500"
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

            <pre className="bg-[#282c34] border border-[#16181d] rounded p-3 text-xs font-mono text-zinc-100 whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    )
}
