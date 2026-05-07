import { useInfiniteQuery } from '@tanstack/vue-query'

export const usePhotos = (query: MaybeRefOrGetter<string>, initialPage = 1) => {
	const { pexels } = useAppConfig()
	const queryRef = toRef(query)

	const options = computed(() => {
		return queryRef.value ? useSearchOptions : useCuratedOptions
	})

	const { data, suspense, hasNextPage, fetchNextPage, error, isFetching } =
		useInfiniteQuery(() =>
			options.value(queryRef.value, pexels.max, initialPage),
		)

	onServerPrefetch(async () => {
		const { error } = await suspense()

		if (error && import.meta.dev) {
			console.error('Error fetching photos:', error)
		}
	})

	const photos = computed(() => data.value?.photos || [])

	const total = computed(() => data.value?.total || 0)

	if (import.meta.dev) {
		watch(
			() => error.value,
			(err) => {
				console.error('Error fetching photos: ', err)
			},
		)
	}

	return { photos, total, hasNextPage, fetchNextPage, isFetching }
}
