export default reactive<{
	ids: Array<{ title: string; id: string; y: number }>
	curPosition: number
}>({ ids: [], curPosition: 0 })
