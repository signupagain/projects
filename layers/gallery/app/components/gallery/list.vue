<script setup lang="ts">
	import { useIsFetching } from '@tanstack/vue-query'
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
	const data = ref<Photo[][]>([[]])
	const idCollection = ref<Set<number>>(new Set())

	const searchQuery = useSearchQuery()
	const { photos, hasNextPage, fetchNextPage } = usePhotos(searchQuery)

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
	const isFetching = useIsFetching({ queryKey: ['pexels'] })

	throttledWatch(
		visibleGalleryBottom,
		() => {
			if (shortestLaneHeight.value === Infinity && isFetching.value) {
				return
			}

			const height = Math.min(
				...Array.from(columnEls.value ?? []).map((el) => el.clientHeight),
			)

			shortestLaneHeight.value = height
		},
		{ throttle: 800, trailing: true, leading: true },
	)

	watch(
		lanes,
		(lanes) => {
			const cache: Photo[][] = Array.from({ length: lanes }, () => [])
			const count = page.value * pageSize

			for (let i = 0; i < count; i++) {
				const index = i % lanes
				cache[index]?.push(photos.value[i]!)
			}

			data.value = cache
		},
		{ immediate: true },
	)

	watch(
		[() => photos.value, () => page.value],
		([photos, page]) => {
			// When SearchQuery changes, the original data in data will lose all address values and become undefined.
			for (const lane of data.value) {
				for (const photo of lane) {
					if (!photo) {
						break
					}

					idCollection.value.add(photo.id)
				}
			}

			if (idCollection.value.size === 0) {
				data.value = Array.from({ length: lanes.value }, () => [])
			}

			for (let i = 0; i < page * pageSize; i++) {
				const index = i % lanes.value

				const newPhoto = photos[i]

				if (!newPhoto) break

				if (idCollection.value.has(newPhoto.id)) continue

				data.value[index]?.push(newPhoto)
				idCollection.value.add(newPhoto.id)
			}
		},
		{ immediate: true },
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
			<template v-for="item in lane">
				<LazyGalleryListitem
					v-if="item"
					:id="item.id"
					:key="item.id"
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
