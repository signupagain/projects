export default (
	update: () => void,
	{ x, y }: { x: number; y: number },
	isColorModeChanging = useIsColorModeChanging(),
) => {
	isColorModeChanging.value = true

	const updateCallback = () => {
		try {
			update()
		} catch (error) {
			console.error('Error during color mode update: ', error)
		} finally {
			isColorModeChanging.value = false
		}
	}

	if (!document.startViewTransition) {
		updateCallback()
		return
	}

	const endRadius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y),
	)

	const transition = document.startViewTransition(updateCallback)

	transition.ready.then(() => {
		const duration = 600
		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${endRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: duration,
				easing: 'cubic-bezier(.76,.32,.29,.99)',
				pseudoElement: '::view-transition-new(root)',
			},
		)
	})
}
