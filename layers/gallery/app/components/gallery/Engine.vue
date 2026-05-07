<script setup lang="ts">
	const groupEl = useTemplateRef('group')
	const { width: groupWidth } = useElementSize(() => groupEl.value)
	const galleryLanes = useGalleryLanes()

	watchDebounced(
		groupWidth,
		(width) => {
			galleryLanes.value = Math.max(1, Math.min(5, Math.round(width / 300)))
		},
		{ debounce: 300 },
	)

	const singleLaneWidth = computed(
		() =>
			(groupWidth.value - 16 * (galleryLanes.value + 1)) / galleryLanes.value,
	)

	const listEl = useTemplateRef('list')
	const initialPhotoData = useInitialPhotoData()

	const navigate = async (e: PointerEvent) => {
		const target = e.target

		if (!(target instanceof HTMLImageElement)) return

		if (!target.id) {
			throw createError(
				'the NuxtImg of Image.vue should have an "id" attribute',
			)
		}

		initialPhotoData.value = listEl.value?.photos.find(
			({ id }) => id === +target.id,
		)

		await navigateTo({ name: 'gallery-id', params: { id: target.id } })
	}

	const searchQuery = useSearchQuery()
</script>

<template>
	<div
		ref="group"
		class="flex items-start justify-around px-4"
		@click="navigate"
	>
		<GalleryList
			:key="searchQuery || 'curated'"
			ref="list"
			:lane-width="singleLaneWidth"
		/>
	</div>
</template>

<style lang="scss"></style>
