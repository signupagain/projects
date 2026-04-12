<script setup lang="ts">
	const route = useRoute()
	const { data: page } = await useAsyncData(route.path + '-page', () => {
		return queryCollection('content').path(route.path).first()
	})

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
	<UPage v-if="page">
		<pre>{{ page }}</pre>
	</UPage>
</template>

<style lang="scss"></style>
