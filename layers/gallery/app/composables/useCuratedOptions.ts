import type {
	InferContractRouterInputs,
	InferContractRouterOutputs,
} from '@orpc/contract'
import {
	infiniteQueryOptions,
	skipToken,
	type QueryFunction,
} from '@tanstack/vue-query'

type Input = InferContractRouterInputs<
	typeof pexelsContracts.client.curatedPhotos
>
type Output = InferContractRouterOutputs<
	typeof pexelsContracts.client.curatedPhotos
>

export const useCuratedOptions = (
	query: MaybeRefOrGetter<string>,
	max: number,
	initialPage = 1,
) => {
	const {
		queryKey: { root, curated },
		fetchOptions,
	} = useAppConfig().pexels

	const queryRef = toRef(query)

	const queryKey = [root, curated, queryRef]

	const initialPageParam = {
		page: initialPage,
		per_page: max,
	} satisfies Input

	const queryFn = computed(() =>
		queryRef.value ? skipToken : (
			((({ signal, pageParam }) =>
				$fetch('/api/pexels/curated', {
					...fetchOptions,
					query: pageParam,
					signal,
				})) satisfies QueryFunction<
				Output,
				typeof queryKey,
				typeof initialPageParam
			>)
		),
	)

	return infiniteQueryOptions({
		queryKey,
		queryFn,
		initialPageParam,
		getNextPageParam: (lastPage) => ({
			...initialPageParam,
			page: lastPage.page + 1,
		}),
		select: (data) => ({
			photos: data.pages.flatMap((page) => page.photos),
			total: data.pages[data.pages.length - 1]?.total_results ?? 0,
		}),
	})
}
