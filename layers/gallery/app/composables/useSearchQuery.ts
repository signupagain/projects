import type { GalleryPageQuery } from '../pages/gallery/[[id]].vue'

export const useSearchQuery = () => {
	const route = useRoute('gallery-id')
	const searchQuery = ref('')

	watch(
		() => (route.query as GalleryPageQuery).search,
		(query) => {
			if (route.params.id) return

			searchQuery.value = query || ''
		},
		{ immediate: true },
	)

	return searchQuery
}
