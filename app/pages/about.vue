<script setup lang="ts">
	const { data: page } = await useFetch('/api/about')

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

	const { avatar } = useAppConfig()
</script>

<template>
	<UPage v-if="page" as="main">
		<UPageHero
			:title="page.title"
			:description="page.description"
			orientation="horizontal"
			:ui="{
				container: 'lg:flex sm:flex-row items-center pb-16!',
				title: 'mx-0! text-left',
				description: 'mx-0! text-left whitespace-pre-line leading-[1.6]',
				links: 'justify-start',
			}"
		>
			<UColorModeAvatar
				class="ring-default ring-offset-bg size-36 rounded-lg ring ring-offset-3 sm:rotate-4"
				:light="avatar.light"
				:dark="avatar.dark"
				:alt="avatar.alt"
			/>
		</UPageHero>
		<UPageSection
			:ui="{
				container: 'pt-0!',
			}"
		>
			<ContentRenderer :value="page.body" />
		</UPageSection>
	</UPage>
</template>

<style lang="scss"></style>
