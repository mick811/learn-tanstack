import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Sidebar } from '../components/sidebar'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <aside className="w-full sm:w-64 md:w-80 lg:w-96 xl:w-md p-4 sm:p-5 md:p-6 lg:p-8 bg-[conic-gradient(from_90deg_at_-10%_100%,#2b303b_0deg,#2b303b_90deg,#16181d_1turn)] overflow-y-auto">
        <Sidebar />
      </aside>
      
      <main className="flex-1 min-w-0">
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
