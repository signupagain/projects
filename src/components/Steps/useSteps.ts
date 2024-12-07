export default (
	steps: Ref<string[]>,
	activeIndex: Ref<number>,
	activeIndexSteps: Ref<number>,
	token: Ref<number | null>,
	delay: number
) =>
	setInterval(() => {
		assertIsDefined('token', token.value)

		if (
			activeIndexSteps.value === 0 ||
			(activeIndexSteps.value > 0 &&
				activeIndex.value === steps.value.length - 1) ||
			(activeIndexSteps.value < 0 && activeIndex.value === 0)
		) {
			activeIndexSteps.value = 0
			clearInterval(token.value)
			return (token.value = null)
		}

		if (activeIndexSteps.value > 0) {
			activeIndex.value++

			return setTimeout(() => {
				activeIndexSteps.value >= steps.value.length ?
					(activeIndexSteps.value = steps.value.length - 2)
				:	activeIndexSteps.value--
			}, delay)
		}

		if (activeIndexSteps.value < 0) {
			activeIndex.value--

			return setTimeout(() => {
				activeIndexSteps.value <= -steps.value.length ?
					(activeIndexSteps.value = 2 - steps.value.length)
				:	activeIndexSteps.value++
			}, delay)
		}
	}, delay + 100)
