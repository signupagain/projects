<script setup lang="ts">
	import type { ButtonProps } from '@nuxt/ui'

	defineProps<{
		credits: string
		links?: (Partial<ButtonProps> & { to: string })[]
	}>()
</script>

<template>
	<UFooter
		:ui="{
			left: 'text-muted text-xs',
		}"
	>
		<template #left>{{ credits }}</template>
		<template v-if="links" #right>
			<UButton
				v-for="(link, index) of links"
				:key="index"
				v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
			/>
		</template>
	</UFooter>
</template>

<style lang="scss"></style>
