<script setup lang="ts">
	const { data: page } = await useAsyncData('index-page', () => {
		return queryCollection('index').first()
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
		<LandingHero
			:title="page.title"
			:description="page.description"
			:hero="page.hero"
		/>
		<UPageSection
			:ui="{
				container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8',
			}"
		>
			<LandingAbout v-bind="page.about" />
			<LandingWorkExperience v-bind="page.experience" />
		</UPageSection>
	</UPage>
</template>

<style lang="scss"></style>
