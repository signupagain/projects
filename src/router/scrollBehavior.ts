import type { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
	const store = useAppStore()

	return new Promise(res => {
		store.$subscribe((_, state) => {
			if (state.isTransitionEnd) {
				if (to.hash) res({ el: to.hash })
				if (savedPosition) res(savedPosition)

				res({ top: 0, behavior: 'smooth' })
			}
		})
	})
}

export default scrollBehavior
