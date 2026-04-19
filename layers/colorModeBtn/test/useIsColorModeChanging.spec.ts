import useIsColorModeChanging from '../app/composables/useIsColorModeChanging'
import { describe, expect, it } from 'vitest'

describe('useIsColorModeChanging', () => {
	it('should return a ref with an initial value of false', () => {
		const isColorModeChanging = useIsColorModeChanging()
		expect(isColorModeChanging.value).toBe(false)
	})

	it('should allow updating the value', () => {
		const isColorModeChanging = useIsColorModeChanging()
		isColorModeChanging.value = true
		expect(isColorModeChanging.value).toBe(true)
	})

	it('should maintain state across multiple calls', () => {
		const isColorModeChanging1 = useIsColorModeChanging()
		const isColorModeChanging2 = useIsColorModeChanging()
		isColorModeChanging1.value = true
		expect(isColorModeChanging2.value).toBe(true)
	})
})
