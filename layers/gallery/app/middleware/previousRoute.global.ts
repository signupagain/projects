export default defineNuxtRouteMiddleware((to, from) => {
	if (to.fullPath === from.fullPath) return

	const previousRoute = usePreviousRoute()

	previousRoute.value = from
})
