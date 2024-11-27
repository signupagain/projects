export default (el: unknown) => (e: Event) => {
	if (isRef(el)) el = el.value

	assertIsHTMLElement(el)
	assertIsMouseEvent(e)

	el.style.left = `${e.pageX}px`
	el.style.top = `${e.pageY}px`
}
