export default async (el: unknown) => {
	const canvas = ref<HTMLCanvasElement>()

	if (isRef(el)) {
		assertIsHTMLElement(el.value)

		canvas.value = await html2canvas(el.value)

		return canvas
	}

	assertIsHTMLElement(el)
	canvas.value = await html2canvas(el)

	return canvas
}
