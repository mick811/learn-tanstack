import { useMemo } from 'react'
import { Link, useRouter, useLocation } from '@tanstack/react-router'
import type { FileRouteTypes } from '../routeTree.gen'

/**
 * recursively flattens a nested route tree into a single array
 * @param node - the route node to flatten
 */
const flattenRoutes = (node: any): any[] => 
  node ? [node, ...Object.values(node.children || {}).flatMap(flattenRoutes)] : []

/**
 * converts a string to proper case (capitalizes first letter)
 * handles camelCase by splitting on capital letters
 */
const toProperCase = (str: string): string => {
  if (str.startsWith('$')) return str // keep dynamic segments as-is
  
  // Split camelCase words (e.g., "userId" -> ["user", "Id"])
  const words = str.replace(/([A-Z])/g, ' $1').trim().split(/\s+/)
  
  // Capitalize first letter of each word
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * header that automatically discovers routes from the (learn) route group
 */
export function Sidebar() {
  const router = useRouter()
  const location = useLocation()

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
          label: parts.map(p => toProperCase(p)).join(' / '),
          to: r.fullPath as FileRouteTypes['fullPaths'],
          params: Object.keys(params).length ? params : undefined,
          routeId: r.id
        }
      })
    
    // add home route at the beginning
    return [
      { label: 'Home', to: '/' as FileRouteTypes['fullPaths'], params: undefined, routeId: '/' },
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
    <div className="space-y-1">
      {learnRoutes.map((route) => {
        const isActive = isRouteActive(route)
        
        return (
          <Link
            key={route.to}
            to={route.to}
            {...(route.params && { params: route.params as any })}
            className={`block px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-7 lg:py-4 text-sm sm:text-base md:text-lg lg:text-xl transition-colors rounded-md ${
              isActive 
                ? 'text-white bg-gray-700/60 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/20'
            }`}
          >
            {route.label}
          </Link>
        )
      })}
    </div>
  )
}
