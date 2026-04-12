<script setup lang="ts">
	const { data: page } = await useFetch('/api')

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
</script>

<template>
	<UPage v-if="page" as="main">
		<pre>{{ page }}</pre>
	</UPage>
</template>

<style lang="scss"></style>
