<script setup lang="ts">
	import { useQuery } from '@tanstack/vue-query'
	import type { SpeedDialsProps } from '#layers/speedDials/app/components/SpeedDials.vue'

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

	const route = useRoute('gallery-id')
	const id = computed(() => +(route.params.id || NaN))
	// Suspense is causing an unknown error without any error message or warning, and the Nitro server is also blocked.
	const { data /* , suspense */ } = useQuery(usePhotoOptions(id))

	// onServerPrefetch(async () => {
	// 	const { error } = await suspense()

	// 	if (error && import.meta.dev) {
	// 		console.error('Error fetching photos:', error)
	// 	}
	// })

	const cardData = computed<typeof data.value | null>((old) =>
		isNaN(id.value) && old ? old : (data.value ?? null),
	)

	onBeforeRouteUpdate((to, from) => {
		if (
			(to.name === 'gallery-id' && !!to.params.id) ||
			(from.name === 'gallery-id' && !!from.params.id)
		)
			return

		pageEl.value?.scrollTo(0, 0)
	})

	const introEl = useTemplateRef('intro')

	const dials: SpeedDialsProps['dials'] = [
		{
			icon: 'lucide:chevron-up',
			label: '回到頂部',
			onClick: () => {
				if (!pageEl.value) return

				pageEl.value.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			},
		},
		{
			icon: 'lucide:book',
			label: '頁面主旨',
			onClick: () => {
				if (!introEl.value) return

				introEl.value.toggle()
			},
		},
	]
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
		<ClientOnly>
			<LazyGalleryCard v-if="cardData" :data="cardData" />
		</ClientOnly>
		<GalleryIntro ref="intro" />
		<SpeedDials :dials="dials" />
	</main>
</template>

<style lang="scss"></style>
