<script setup lang="ts">
	import type { InferContractRouterOutputs } from '@orpc/contract'

	type Photo = InferContractRouterOutputs<
		| typeof pexelsContracts.client.curatedPhotos
		| typeof pexelsContracts.client.searchPhotos
	>['photos'][number]

	const { laneWidth, pageSize = 10 } = defineProps<{
		laneWidth: number
		pageSize?: number
	}>()

	const toast = useToast()
	const { pexels } = useAppConfig()

	const lanes = useGalleryLanes()
	const visibleGalleryBottom = useVisibleGalleryBottom()

	const shortestLaneHeight = ref(0)
	const page = ref(1)

	const searchQuery = useSearchQuery()
	const { photos, hasNextPage, fetchNextPage, isFetching } =
		usePhotos(searchQuery)

	watch(searchQuery, () => {
		page.value = 1
	})

	const data = computed<Photo[][]>(() => {
		const count = page.value * pageSize
		const container: Photo[][] = Array.from({ length: lanes.value }, () => [])

		for (let i = 0; i < count; i++) {
			const index = i % lanes.value
			container[index]?.push(photos.value[i]!)
		}

		return container
	})

	const isNearBottom = computed(
		() =>
			visibleGalleryBottom.value + 50 > (shortestLaneHeight.value || Infinity),
	)

	watchThrottled(
		isNearBottom,
		async (value) => {
			if (!value) return

			if (!hasNextPage.value) {
				toast.add({
					title: '已經沒有更多的照片了',
					icon: 'lucide:circle-alert',
				})

				return
			}

			page.value++

			const needNextPage =
				(page.value * pageSize) % pexels.max >= pexels.max - pageSize

			if (needNextPage) {
				await fetchNextPage()
			}

			shortestLaneHeight.value = Infinity
		},
		{ throttle: 1000, trailing: true, leading: true },
	)

	const columnEls = useTemplateRef('columns')

	throttledWatch(
		visibleGalleryBottom,
		async () => {
			if (shortestLaneHeight.value === Infinity && isFetching.value) {
				return
			}

			await nextTick()

			const height = Math.min(
				...Array.from(columnEls.value ?? []).map((el) => el.clientHeight),
			)

			shortestLaneHeight.value = height
		},
		{ throttle: 800, trailing: true, leading: true },
	)

	const initialPhotoData = useInitialPhotoData()

	onBeforeRouteLeave((to) => {
		if (to.name === 'gallery-id') {
			if (!to.params.id) return

			const id = +to.params.id

			initialPhotoData.value = photos.value.find((photo) => photo.id === id)
		}
	})

	defineExpose({ photos })
</script>

<template>
	<ClientOnly>
		<div
			v-for="(lane, index) in data"
			ref="columns"
			:key="index"
			class="flex flex-col gap-4"
			:style="{ width: laneWidth + 'px' }"
		>
			<template v-for="(item, idx) in lane" :key="item?.id || idx">
				<LazyGalleryListitem
					v-if="item"
					:id="item.id"
					:width="item.width"
					:height="item.height"
					:alt="item.alt"
					:src="item.src"
					:avg-color="item.avg_color"
					:name="item.photographer"
					:photographer-u-r-l="item.photographer_url"
					:img-u-r-l="item.url"
				/>
			</template>
		</div>
	</ClientOnly>
</template>

<style lang="scss"></style>
