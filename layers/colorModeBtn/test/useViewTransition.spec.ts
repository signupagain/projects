import useViewTransition from '../app/composables/useViewTransition'
import { describe, expect, it, vi } from 'vitest'

describe('useViewTransition', () => {
	const update = vi.fn()
	const position = { x: 100, y: 100 }
	const isColorModeChanging = ref(false)

	it('should set isColorModeChanging to false at the end of the view transition', () => {
		useViewTransition(update, position, isColorModeChanging)
		expect(isColorModeChanging.value).toBe(false)
	})

	it('should call the update function', () => {
		useViewTransition(update, position, isColorModeChanging)
		expect(update).toHaveBeenCalled()
	})

	it('should handle errors in the update function gracefully', () => {
		const errorUpdate = () => {
			throw new Error('Test error')
		}
		expect(() =>
			useViewTransition(errorUpdate, position, isColorModeChanging),
		).not.toThrow()
	})

	it('should not call startViewTransition if it is not supported', () => {
		const originalStartViewTransition = document.startViewTransition
		Object.assign(document, { startViewTransition: undefined })

		useViewTransition(update, position, isColorModeChanging)
		expect(update).toHaveBeenCalled()

		document.startViewTransition = originalStartViewTransition
	})

	it('should execute the view transition animation when startViewTransition is supported', async () => {
		const originalStartViewTransition = document.startViewTransition
		const mockTransition = {
			ready: Promise.resolve(),
		}
		Object.assign(document, {
			startViewTransition: vi.fn(() => mockTransition),
		})

		const mockAnimate = vi.fn()
		document.documentElement.animate = mockAnimate

		useViewTransition(update, position, isColorModeChanging)

		await mockTransition.ready

		expect(mockAnimate).toHaveBeenCalledWith(
			{
				clipPath: [
					`circle(0px at ${position.x}px ${position.y}px)`,
					`circle(${Math.hypot(
						Math.max(position.x, window.innerWidth - position.x),
						Math.max(position.y, window.innerHeight - position.y),
					)}px at ${position.x}px ${position.y}px)`,
				],
			},
			{
				duration: 600,
				easing: 'cubic-bezier(.76,.32,.29,.99)',
				pseudoElement: '::view-transition-new(root)',
			},
		)

		expect(document.startViewTransition).toHaveBeenCalled()

		document.startViewTransition = originalStartViewTransition
	})
})
