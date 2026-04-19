import resolveClickPosition from '../app/utils/resolveClickPosition'
import { describe, it, expect } from 'vitest'

describe('resolveClickPosition', () => {
	it('should resolve click position correctly', () => {
		const btn = document.createElement('button')
		let result: ReturnType<typeof resolveClickPosition> | null = null

		btn.addEventListener('click', (event) => {
			result = resolveClickPosition(event)
		})

		const mouseEvent = new MouseEvent('click', {
			clientX: 150,
			clientY: 150,
			detail: 1,
		})

		btn.dispatchEvent(mouseEvent)

		expect(result).toEqual({ x: 150, y: 150 })
	})

	it('should resolve click position to center when not a normal click event(i.e. keyboard event)', () => {
		const btn = document.createElement('button')

		btn.getBoundingClientRect = () => ({
			left: 50,
			top: 50,
			width: 100,
			height: 100,
			right: 150,
			bottom: 150,
			x: 50,
			y: 50,
			toJSON() {
				return this
			},
		})

		let result: ReturnType<typeof resolveClickPosition> | null = null

		btn.addEventListener('click', (event) => {
			result = resolveClickPosition(event)
		})

		const mouseEvent = new MouseEvent('click', {
			clientX: 0,
			clientY: 0,
			detail: 0, // Not a normal click event
		})

		btn.dispatchEvent(mouseEvent)

		expect(result).toEqual({ x: 100, y: 100 })
	})
})
