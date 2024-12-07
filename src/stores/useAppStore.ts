import { defineStore } from 'pinia'

export const useAppStore = defineStore('useAppStore', () => {
	const isTransitionEnd = ref(true)

	return { isTransitionEnd }
})
