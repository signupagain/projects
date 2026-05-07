import type { RouteLocationNormalized } from 'vue-router'

export const usePreviousRoute = () =>
	useState<RouteLocationNormalized | null>('previousRoute', () => null)
