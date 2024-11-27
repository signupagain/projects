export function assertIsHTMLElement(
	value: unknown
): asserts value is HTMLElement {
	if (!(value instanceof HTMLElement)) throw new Error('Not a HtmlElement.')
}

export function assertIsNode(value: unknown): asserts value is Node {
	if (!(value instanceof Node)) throw new Error('Not a Node.')
}

export function assertIsEventTarget(
	value: unknown
): asserts value is EventTarget {
	if (!(value instanceof EventTarget)) throw new Error('Not a EventTarget.')
}

export function assertIsMouseEvent(
	value: unknown
): asserts value is MouseEvent {
	if (!(value instanceof MouseEvent)) throw new Error('Not a MouseEvent.')
}

export function assertIsDefined<T>(
	key: string,
	value: T | undefined | null
): asserts value is T {
	if (value === undefined || value === null)
		throw new Error(`${key} is not defined.`)
}

export function assertIsKeyof<T extends object>(
	obj: T,
	value: unknown
): asserts value is keyof T {
	if (typeof value === 'string' && !(value in obj))
		throw new Error(
			`Invalid value: '${value}' is not a key of the provided object. Object keys are: ${Object.keys(obj).join(', ')}`
		)
}
