import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { CollapsibleHeader } from '../components/collapsible-header'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

interface Context {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <div className="min-h-screen flex">
      <aside className="w-80 border-r border-gray-700/50 p-6 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)]">
        <CollapsibleHeader />
      </aside>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'React Query',
            render: <ReactQueryDevtoolsPanel />,
          }
        ]}
      />
    </div>
  ),
})
