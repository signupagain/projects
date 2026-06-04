<script setup lang="ts">
	import { useFileBrowserDataStore } from '../stores/useFileBrowserDataStore'

	definePageMeta({
		layout: 'file-browser-default',
	})

	const { data: page } = await useFetch('/api/fileBrowser')

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

	const dataStore = useFileBrowserDataStore()

	await dataStore.initialize()

	const { width } = useWindowSize()
	const isAsideVisible = computed(() => width.value >= 1024)

	onBeforeUnmount(() => {
		dataStore.backToNode(0)
	})
</script>

<template>
	<div v-if="page" class="layout">
		<FileBrowserHeader class="header" :title="page.title" />
		<FileBrowserMain class="main" :is-aside-visible="isAsideVisible" />
		<FileBrowserAside class="aside" :is-aside-visible="isAsideVisible" />
		<FileBrowserFooter class="footer" />
	</div>
</template>

<style lang="scss" scoped>
	.layout {
		display: flex;
		flex-flow: column;

		height: 100vh;

		@media (min-width: 1024px) {
			display: grid;
			grid:
				'header aside'
				'main aside' 1fr
				'footer aside'
				/ 1fr 23em;
		}
	}

	.header {
		grid-area: header;
	}

	:deep(.main) {
		flex: 1;

		@media (min-width: 1024px) {
			grid-area: main;
		}
	}

	.aside {
		grid-area: aside;
	}

	.footer {
		grid-area: footer;
	}
</style>
