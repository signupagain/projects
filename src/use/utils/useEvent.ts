export default (
	target: unknown,
	event:
		| keyof GlobalEventHandlersEventMap
		| (keyof GlobalEventHandlersEventMap)[],
	callback: (e: Event) => void
) => {
	if (target instanceof EventTarget) {
		if (typeof event === 'string') {
			onMounted(() => target.addEventListener(event, callback))
			onBeforeUnmount(() => target.removeEventListener(event, callback))

			return
		}

		event.forEach(event => {
			onMounted(() => target.addEventListener(event, callback))
			onBeforeUnmount(() => target.removeEventListener(event, callback))
		})
	}

	if (isRef(target)) {
		if (typeof event === 'string') {
			onMounted(() => {
				assertIsEventTarget(target.value)
				target.value.addEventListener(event, callback)
			})
			onBeforeUnmount(() => {
				assertIsEventTarget(target.value)
				target.value.removeEventListener(event, callback)
			})

			return
		}

		event.forEach(event => {
			onMounted(() => {
				assertIsEventTarget(target.value)
				target.value.addEventListener(event, callback)
			})
			onBeforeUnmount(() => {
				assertIsEventTarget(target.value)
				target.value.removeEventListener(event, callback)
			})
		})
	}
}
