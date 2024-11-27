export interface IInterval {
	stop: () => void
	reset: () => number
}

export default (cb: () => void, timeout: number): IInterval => {
	const token = ref<number>()

	onMounted(() => {
		token.value = setInterval(cb, timeout)
	})

	onBeforeUnmount(() => {
		clearInterval(token.value)
	})

	return {
		stop: () => clearInterval(token.value),
		reset: () => (token.value = setInterval(cb, timeout)),
	}
}
