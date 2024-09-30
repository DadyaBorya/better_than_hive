import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { fallbackRoute } from './fallback'
import { publicRoutes } from './public'

export type Route = {
	path: string
	element: JSX.Element
}

export function AppRoutes() {
	const parseRouteObjects = (routes: Route[]): RouteObject[] => {
		return routes.map(route => ({
			path: route.path,
			element: route.element,
		}))
	}

	const publicRouteObjects = parseRouteObjects(publicRoutes)
	const fallbackRouteObjects = parseRouteObjects(fallbackRoute)

	const routes = [...publicRouteObjects, ...fallbackRouteObjects]

	const allRoutes = useRoutes(routes)

	return <React.Fragment> {allRoutes} </React.Fragment>
}
