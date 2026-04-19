/**
 * 解析點擊位置的工具函數
 * @param event - 觸發事件的 MouseEvent 對象
 * @returns 包含 x 和 y 坐標的對象，表示點擊位置
 * @description 此函數[檢測是否由非點擊事件觸發](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)（例如鍵盤事件），如果是，則將動畫中心設置為按鈕的中心
 */

export default (event: MouseEvent) => {
	let x = event.clientX
	let y = event.clientY

	if (event.detail === 0) {
		const targetRect = (
			event.currentTarget as HTMLElement
		).getBoundingClientRect()
		x = targetRect.left + targetRect.width / 2
		y = targetRect.top + targetRect.height / 2
	}

	return { x, y }
}
