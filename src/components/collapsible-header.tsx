import { useState, useMemo } from 'react'
import { Link, useRouter, useLocation } from '@tanstack/react-router'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FileRouteTypes } from '../routeTree.gen'

/**
 * recursively flattens a nested route tree into a single array
 * @param node - the route node to flatten
 */
const flattenRoutes = (node: any): any[] => 
  node ? [node, ...Object.values(node.children || {}).flatMap(flattenRoutes)] : []

/**
 * collapsible header that automatically discovers routes from the (learn) route group
 */
export function CollapsibleHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const location = useLocation()

  // get current route title based on pathname
  const title = useMemo(() => {
    const pathname = location.pathname
    if (pathname === '/') return 'home'
    const parts = pathname.split('/').filter(Boolean)
    return parts.map(p => 
      p.startsWith('$') ? p : p.toLowerCase()
    ).join('/')
  }, [location.pathname])

  // automatically discovers and processes routes from the (learn) route group
  const learnRoutes = useMemo(() => {
    const routes = flattenRoutes(router.routeTree)
      .filter(r => r.id?.includes('(learn)') && r.fullPath && r.fullPath !== '/')
      .map(r => {
        const parts = (r.fullPath as string).split('/').filter(Boolean)
        // auto-generate default params for dynamic routes (e.g. $userId -> 1)
        const params = Object.fromEntries(
          parts.filter(p => p.startsWith('$')).map(p => [p.slice(1), '1'])
        )
        
        return {
          label: parts.map(p => 
            p.startsWith('$') ? p : p.toLowerCase()
          ).join('/'),
          to: r.fullPath as FileRouteTypes['fullPaths'],
          params: Object.keys(params).length ? params : undefined,
          routeId: r.id
        }
      })
    
    // add home route at the beginning
    return [
      { label: 'home', to: '/' as FileRouteTypes['fullPaths'], params: undefined, routeId: '/' },
      ...routes
    ]
  }, [router.routeTree])

  // check if route is active
  const isRouteActive = (route: typeof learnRoutes[0]) => {
    if (route.to === '/') return location.pathname === '/'
    
    // for dynamic routes, check if current path matches the route pattern
    if (route.to.includes('$')) {
      const routePattern = route.to.split('/').filter(Boolean)
      const currentPath = location.pathname.split('/').filter(Boolean)
      
      if (routePattern.length !== currentPath.length) return false
      
      return routePattern.every((segment, i) => 
        segment.startsWith('$') || segment === currentPath[i]
      )
    }
    
    return location.pathname === route.to
  }

  if (!learnRoutes.length) return null

  return (
    <div className='border border-gray-700/50 rounded-lg'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-800/30 transition-colors'
      >
        <span className='text-base font-medium text-gray-300'>{title}</span>
        {isOpen ? (
          <ChevronUp className='text-gray-500 w-4 h-4' />
        ) : (
          <ChevronDown className='text-gray-500 w-4 h-4' />
        )}
      </button>
      {isOpen && (
        <div className='border-t border-gray-700/50'>
          {learnRoutes.map((route) => {
            const isActive = isRouteActive(route)
            
            return (
              <Link
                key={route.to}
                to={route.to}
                {...(route.params && { params: route.params as any })}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-3 text-base transition-colors border-l-2 ${
                  isActive 
                    ? 'text-white bg-gray-700/60 border-gray-500' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/20 border-transparent'
                }`}
              >
                {route.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
