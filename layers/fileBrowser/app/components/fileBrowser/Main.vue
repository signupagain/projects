<script setup lang="ts">
	import { useFileBrowserDataStore } from '../../stores/useFileBrowserDataStore'
	import dayjs from 'dayjs'
	import type { ContextMenuItem } from '@nuxt/ui'

	const { isAsideVisible } = defineProps<{
		isAsideVisible: boolean
	}>()

	const dataStore = useFileBrowserDataStore()
	const {
		displayedNodes,
		fileCategoryMap,
		selectedItems,
		selectedItemsCount,
		stack,
		layout,
		drawerBtn,
	} = storeToRefs(dataStore)

	defineShortcuts({
		ctrl_a: () => {
			dataStore.pushSelectedItems(displayedNodes.value.map((item) => item.id))
		},
		Delete: () => {
			dataStore.deleteNodeItems()
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
		type: Item['type']
		title: string
		description: string
		icon: string
		color: string
		modified: string
		size: string
		active: boolean
	}

	const isLoaded = ref(false)

	onMounted(async () => {
		isLoaded.value = await dataStore.initialize()
	})

	const items = computed<(number | DisplayedItem)[]>(() =>
		!isLoaded.value ?
			Array.from({ length: 100 }, () =>
				Math.min(80, Math.max(40, Math.trunc(Math.random() * 101))),
			)
		:	displayedNodes.value.map((item) => {
				const props = fileCategoryMap.value.get(item.extension ?? '')!

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
		() => stack.value.length,
		() => {
			shiftAnchorIndex.value = -1
		},
	)

	async function clickBtn(
		event: MouseEvent,
		item: DisplayedItem,
		index: number,
	) {
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

				dataStore.pushSelectedItems(
					items.value.slice(start, end + 1).map((item) => {
						if (typeof item === 'number') {
							throw new Error('item should not be a number.')
						}

						return item.id
					}),
				)
			}

			shiftAnchorIndex.value = index
			return
		}

		shiftAnchorIndex.value = index

		if (event.ctrlKey) {
			if (selectedItems.value.has(item.id)) {
				dataStore.deleteSelectedItem(item.id)
				dataStore.clearActiveIfMissing()
			} else {
				dataStore.pushSelectedItems(item.id)
			}

			return
		}

		if (item.type === 'file') {
			dataStore.clearSelectedItems()
			dataStore.pushSelectedItems(item.id)
			dataStore.setActiveItem(item.id)

			if (!isAsideVisible) {
				const btn = event.currentTarget as HTMLElement

				btn.blur()
				drawerBtn.value = btn
			}
		} else {
			dataStore.moveToNode(item.id)
		}
	}

	function clearState() {
		shiftAnchorIndex.value = -1
		dataStore.clearSelectedItems()
		dataStore.deleteActiveItem()
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
			<div
				v-if="typeof item === 'number'"
				class="flex"
				:class="
					layout === 'grid' ?
						'h-25 flex-col items-center justify-center gap-2'
					:	'h-13'
				"
			>
				<USkeleton class="size-8" />
				<div class="flex w-full flex-col items-center gap-2">
					<USkeleton class="h-2.5" :style="{ width: item + '%' }" />
					<USkeleton class="h-2.5 w-1/3" />
				</div>
			</div>
			<UButton
				v-else
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
			</UButton>
		</UScrollArea>
	</UContextMenu>
</template>

<style lang="scss"></style>
