import { useInfiniteQuery } from '@tanstack/vue-query'

export const usePhotos = (query: MaybeRefOrGetter<string>, initialPage = 1) => {
	const { pexels } = useAppConfig()
	const queryRef = toRef(query)

	const {
		data: curatedData,
		suspense: curatedSuspense,
		hasNextPage: curatedHasNextPage,
		fetchNextPage: curatedFetchNextPage,
		error: curatedError,
	} = useInfiniteQuery(useCuratedOptions(queryRef, pexels.max, initialPage))

	const {
		data: searchData,
		suspense: searchSuspense,
		hasNextPage: searchHasNextPage,
		fetchNextPage: searchFetchNextPage,
		error: searchError,
	} = useInfiniteQuery(useSearchOptions(queryRef, pexels.max, initialPage))

	const suspense = () => (queryRef.value ? searchSuspense() : curatedSuspense())

	onServerPrefetch(async () => {
		const { error } = await suspense()

		if (error && import.meta.dev) {
			console.error('Error fetching photos:', error)
		}
	})

	const photos = computed(
		() => (queryRef.value ? searchData : curatedData).value?.photos || [],
	)

	const total = computed(
		() => (queryRef.value ? searchData : curatedData).value?.total || 0,
	)

	const hasNextPage = computed(() =>
		queryRef.value ? searchHasNextPage.value : curatedHasNextPage.value,
	)

	const fetchNextPage = () =>
		queryRef.value ? searchFetchNextPage() : curatedFetchNextPage()

	const error = computed(
		() => (queryRef.value ? searchError : curatedError).value,
	)

	if (import.meta.dev) {
		watch(
			() => error.value,
			(err) => {
				console.error('Error fetching photos: ', err)
			},
		)
	}

	return { photos, total, hasNextPage, fetchNextPage }
}
