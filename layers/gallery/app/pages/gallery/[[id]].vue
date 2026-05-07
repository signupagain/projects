<script setup lang="ts">
	export type GalleryPageQuery = {
		search?: string
	}

	definePageMeta({
		layout: 'gallery-default',
		validate(meta) {
			const appConfig = useAppConfig()

			if (meta.name !== 'gallery-id') return appConfig.error.notFound

			return (
				(meta.params?.id === undefined ?
					true
				:	typeof +meta.params.id === 'number') || appConfig.error.notFound
			)
		},
		key(route) {
			return route.name
		},
	})

	const { data: page } = await useFetch('/api/gallery')

	if (!page.value) {
		const appConfig = useAppConfig()
		throw createError(appConfig.error.notFound)
	}

	useSeoMeta({
		title: page.value?.seo.title || page.value?.title,
		ogTitle: page.value?.seo.title || page.value?.title,
		description: page.value?.seo.description || page.value?.description,
		ogDescription: page.value?.seo.description || page.value?.description,
	})

	const pageEl = useTemplateRef('page')
	const visibleGalleryBottom = useVisibleGalleryBottom()

	onMounted(() => {
		if (pageEl.value)
			useEventListener(
				pageEl.value,
				'scroll',
				() => {
					visibleGalleryBottom.value =
						(pageEl.value?.scrollTop || 0) + (pageEl.value?.offsetHeight || 0)
				},
				{ passive: true },
			)
	})

	onBeforeRouteUpdate((to, from) => {
		if (
			(to.name === 'gallery-id' && !!to.params.id) ||
			(from.name === 'gallery-id' && !!from.params.id)
		)
			return

		pageEl.value?.scrollTo(0, 0)
	})
</script>

<template>
	<main v-if="page" ref="page" class="h-screen overflow-y-scroll">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:ui="{
				description: 'text-pretty',
			}"
		/>
		<GalleryEngine />
	</main>
</template>

<style lang="scss"></style>
