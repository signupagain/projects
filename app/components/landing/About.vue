<script setup lang="ts">
	defineProps<{
		title: string
		description: string
	}>()
</script>

<template>
	<UPageSection
		:title
		:description
		:ui="{
			container: 'p-0!',
			title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
			description:
				'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted whitespace-pre-line text-pretty',
		}"
	/>
</template>

<style lang="scss"></style>
