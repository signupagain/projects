<script setup lang="ts">
	export type GalleryPageQuery = {
		search?: string
	}

	definePageMeta({
		layout: 'gallery-default',
		validate(meta) {
			if (meta.name !== 'gallery-id')
				return {
					statusCode: 404,
					message: 'Page not found',
					fatal: true,
				}

			return (
				(meta.params?.id === undefined ?
					true
				:	typeof +meta.params.id === 'number') || {
					statusCode: 404,
					message: 'Page not found',
					fatal: true,
				}
			)
		},
		key(route) {
			return route.name
		},
	})

	const { data: page } = await useAsyncData('gallery-page', () =>
		queryCollection('gallery').first(),
	)

	if (!page.value) {
		throw createError({
			statusCode: 404,
			message: 'Page not found',
			fatal: true,
		})
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
	<div v-if="page" ref="page" class="h-screen overflow-y-scroll">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:ui="{
				description: 'text-pretty',
			}"
		/>
		<GalleryEngine />
	</div>
</template>

<style lang="scss"></style>
