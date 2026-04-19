<script setup lang="ts">
	import { colord } from 'colord'

	const toast = useToast()
	const darkReaderDetector = useTemplateRef('detector')
	const colorMode = useColorMode()

	const nextTheme = computed(() =>
		colorMode.value === 'dark' ? 'light' : 'dark',
	)

	const config = {
		class: 'bg-[#fff] text-[#000]',
		expected: {
			bg: colord('#fff').toRgbString(),
			color: colord('#000').toRgbString(),
			filter: 'none',
		},

		toastId: 'color-mode-interference',
	}

	const isThemeOverridden = (detector: HTMLElement) =>
		getComputedStyle(detector).backgroundColor !== config.expected.bg ||
		getComputedStyle(detector).color !== config.expected.color ||
		getComputedStyle(document.documentElement).filter !== config.expected.filter

	const isDarkReaderEnabled = () => {
		if (!darkReaderDetector.value)
			throw new Error('DarkReaderDetector is not mounted yet.')

		const result = isThemeOverridden(darkReaderDetector.value)

		if (result) {
			toast.add({
				id: config.toastId,
				title: '請關閉 "深色模式" 擴充功能',
				description: h(
					'span',
					{ class: 'whitespace-pre-line text-pretty' },
					`"深色模式" 正在影響主題切換功能，
					請將其暫時停用以獲得最佳體驗。`,
				),
				icon: `lucide:${nextTheme.value === 'dark' ? 'sun' : 'moon'}`,
			})
		} else {
			toast.remove(config.toastId)
		}

		return result
	}

	defineExpose({
		isDarkReaderEnabled,
	})
</script>

<template>
	<Teleport to="#teleports">
		<div
			ref="detector"
			class="absolute -z-1 -ml-100 size-1"
			:class="config.class"
		/>
	</Teleport>
</template>

<style lang="scss"></style>
