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
</script>

<template>
	<div v-if="page">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:ui="{
				description: 'text-pretty',
			}"
		/>
	</div>
</template>

<style lang="scss"></style>
