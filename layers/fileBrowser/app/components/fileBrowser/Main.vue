<script setup lang="ts">
	import {
		useFileBrowserDataStore,
		type DataSeedItemType,
	} from '../../stores/useFileBrowserDataStore'
	import dayjs from 'dayjs'
	import type { ContextMenuItem } from '@nuxt/ui'

	const { isAsideVisible } = defineProps<{
		isAsideVisible: boolean
	}>()

	const dataStore = useFileBrowserDataStore()
	const {
		displayedNode,
		fileTypeMap,
		selectedItems,
		selectedItemsCount,
		nodeStack,
		layout,
		isDrawerOpen,
	} = storeToRefs(dataStore)

	defineShortcuts({
		ctrl_a: () => {
			dataStore.pushSelectedItems(displayedNode.value.map((item) => item.id))
		},
	})

	const scrollArea = useTemplateRef('scroll')
	const { width: scrollAreaWidth } = useElementSize(() => scrollArea.value?.$el)

	const lanes = ref(1)

	watch([layout, scrollAreaWidth], ([type, width]) => {
		if (type === 'list') {
			lanes.value = 1
			return
		}

		lanes.value = Math.max(1, Math.min(15, Math.round(width / 125)))
	})

	export type DisplayedItem = {
		id: string
		type: DataSeedItemType['type']
		title: string
		description: string
		icon: string
		color: string
		modified: string
		size: string
		active: boolean
	}

	const items = computed<DisplayedItem[]>(() =>
		displayedNode.value.map((item) => {
			const props = fileTypeMap.value.get(item.extension ?? '')!

			return {
				id: item.id,
				type: item.type,
				title: item.name,
				description: props.label,
				icon: props.icon,
				color: props.color,
				modified: dayjs(item.modified).format('MM/DD HH:mm'),
				size: typeof item.size === 'number' ? formatBytes(item.size) : '--',
				active: selectedItems.value.has(item.id),
			} satisfies DisplayedItem
		}),
	)

	const shiftAnchorIndex = ref(-1)

	watch(
		() => nodeStack.value.length,
		() => {
			shiftAnchorIndex.value = -1
		},
	)

	function clickBtn(event: MouseEvent, item: DisplayedItem, index: number) {
		isDrawerOpen.value = false

		if (event.shiftKey) {
			if (shiftAnchorIndex.value === -1) {
				dataStore.pushSelectedItems(item.id)
			} else {
				let start: number, end: number

				if (shiftAnchorIndex.value > index) {
					start = index
					end = shiftAnchorIndex.value
				} else {
					start = shiftAnchorIndex.value
					end = index
				}

				for (let i = start; i <= end; i++) {
					dataStore.pushSelectedItems(items.value[i]!.id)
				}
			}

			shiftAnchorIndex.value = index
			return
		}

		shiftAnchorIndex.value = index

		if (event.ctrlKey) {
			if (selectedItems.value.has(item.id)) {
				dataStore.deleteSelectedItem(item.id)
			} else {
				dataStore.pushSelectedItems(item.id)
			}

			return
		}

		if (item.type === 'file') {
			dataStore.clearSelectedItems()
			dataStore.pushSelectedItems(item.id)
			dataStore.setFocusItem(item.id)

			if (!isAsideVisible) isDrawerOpen.value = true
		} else {
			dataStore.moveToNode(item.id)
			dataStore.clearSelectedItems()
		}
	}

	function clearState() {
		shiftAnchorIndex.value = -1
		dataStore.clearSelectedItems()
		dataStore.deleteFocusItem()
	}

	const contextMenuItem = computed<ContextMenuItem[][]>(() => [
		[
			{
				label: '刪除已選檔案',
				icon: 'i-lucide:circle-x',
				color: 'warning',
				disabled: selectedItemsCount.value < 1,
				onSelect: () => {
					dataStore.deleteNodeItems()
					clearState()
				},
			},
		],
	])
</script>

<template>
	<UContextMenu :items="contextMenuItem">
		<UScrollArea
			v-slot="{ item, index }"
			ref="scroll"
			as="main"
			:items="items"
			:virtualize="{
				lanes,
				gap: 16,
				estimateSize: () => (layout === 'grid' ? 100 : 52),
				skipMeasurement: true,
				overscan: 5,
			}"
			:ui="{
				root: 'p-4 scrollbar-thin',
				viewport: 'text-center @container',
				item: 'text-center',
			}"
			@click="clearState()"
		>
			<LazyUButton
				color="neutral"
				:variant="item.active ? 'solid' : 'ghost'"
				:ui="{
					base: 'w-full',
				}"
				@click.stop="clickBtn($event, item, index)"
			>
				<div
					v-if="layout === 'list'"
					class="flex min-w-0 flex-1 items-center gap-4"
				>
					<UIcon
						:name="'i-lucide-' + item.icon"
						class="size-6.5"
						:class="iconColorMap[item.color]"
					/>
					<div class="flex min-w-0 flex-1 flex-col text-start">
						<strong class="truncate">{{ item.title }}</strong>
						<p class="truncate">{{ item.description }}</p>
					</div>
					<p
						class="hidden flex-none items-center justify-between text-end @md:flex"
					>
						<span class="min-w-36">{{ item.modified }}</span>
						<span class="min-w-24">{{ item.size }}</span>
					</p>
				</div>
				<div v-else class="flex min-w-0 flex-1 flex-col items-center gap-2">
					<UIcon
						:name="'i-lucide-' + item.icon"
						class="size-8"
						:class="iconColorMap[item.color]"
					/>
					<h2 class="w-full truncate">{{ item.title }}</h2>
					<span class="h-5 w-full truncate">{{
						item.type === 'file' ? item.size : ''
					}}</span>
				</div>
			</LazyUButton>
		</UScrollArea>
	</UContextMenu>
</template>

<style lang="scss" scoped></style>
