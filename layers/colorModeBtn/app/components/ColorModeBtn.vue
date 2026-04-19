<script setup lang="ts">
	const colorMode = useColorMode()

	const color = computed(() =>
		colorMode.value === 'dark' ? '#020618' : 'white',
	)

	useHead({
		meta: [
			{
				name: 'theme-color',
				content: color,
			},
		],
	})

	const nextTheme = computed(() =>
		colorMode.value === 'dark' ? 'light' : 'dark',
	)

	const switchTheme = () => {
		colorMode.preference = nextTheme.value
	}

	const darkReaderDetector = useTemplateRef('detector')

	const startViewTransition = (event: MouseEvent) => {
		if (darkReaderDetector.value?.isDarkReaderEnabled()) return

		const { x, y } = resolveClickPosition(event)

		useViewTransition(switchTheme, { x, y })
	}
</script>

<template>
	<ClientOnly>
		<UButton
			:aria-label="`Switch to ${nextTheme} mode`"
			:icon="`lucide:${nextTheme === 'dark' ? 'sun' : 'moon'}`"
			color="neutral"
			variant="ghost"
			size="sm"
			class="rounded-full focus-visible:ring-2"
			v-bind="$attrs"
			@click="startViewTransition"
		/>
		<DarkReaderDetector ref="detector" />
		<template #fallback>
			<div class="size-7" />
		</template>
	</ClientOnly>
</template>

<style lang="scss">
	::view-transition-old(root),
	::view-transition-new(root) {
		animation: none;
		mix-blend-mode: normal;
	}

	::view-transition-new(root) {
		z-index: 9999;
	}
	::view-transition-old(root) {
		z-index: 1;
	}
</style>
