<script setup lang="ts">
	import { useFileBrowserDataStore } from '../../stores/useFileBrowserDataStore'

	const { isAsideVisible } = defineProps<{
		isAsideVisible: boolean
	}>()

	const dataStore = useFileBrowserDataStore()
	const { focusItem, isDrawerOpen } = storeToRefs(dataStore)

	watchEffect(() => {
		if (isAsideVisible) {
			isDrawerOpen.value = false
			return
		}

		isDrawerOpen.value = !!focusItem.value
	})
</script>

<template>
	<div>
		<aside v-if="isAsideVisible" class="border-default h-full border-l-2 p-4">
			<LazyFileBrowserCard />
		</aside>
		<LazyUDrawer
			v-model:open="isDrawerOpen"
			hydrate-on-idle
			aria-label="檔案檢視彈窗"
			:ui="{
				body: 'max-h-[50vh] overflow-auto scrollbar-thin',
			}"
		>
			<template #body
				><LazyFileBrowserCard class="mx-auto my-4 max-w-100"
			/></template>
		</LazyUDrawer>
	</div>
</template>

<style lang="scss"></style>
