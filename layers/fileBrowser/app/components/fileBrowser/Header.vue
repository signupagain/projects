<script setup lang="ts">
	import type {
		BreadcrumbItem,
		RadioGroupItem,
		SelectItem,
		DropdownMenuItem,
	} from '@nuxt/ui'
	import { useFileBrowserDataStore } from '../../stores/useFileBrowserDataStore'

	defineProps<{
		title: string
	}>()

	const dataStore = useFileBrowserDataStore()
	const { stack, layout, searchValue, sortBy, order } = storeToRefs(dataStore)

	const breadcrumbItems = computed<
		(BreadcrumbItem & { children?: DropdownMenuItem[] })[]
	>(() => {
		const items = stack.value.map(
			(route, index) =>
				({ label: route.dirname, index }) satisfies BreadcrumbItem,
		)

		if (items.length < 4) {
			return items
		}

		const start = items[0]!
		const center = items.slice(1, -2)
		const end = items.slice(-2)

		const dropdownSlot = {
			slot: 'dropdown' as const,
			icon: 'i-lucide-ellipsis',
			children: center.map(
				({ label, index }) =>
					({
						label,
						onSelect() {
							dataStore.moveToNode(index)
						},
					}) satisfies DropdownMenuItem,
			),
		} satisfies BreadcrumbItem

		return [start, dropdownSlot, ...end]
	})

	export type LayoutType = 'grid' | 'list'

	const radioItems = ref<RadioGroupItem[]>([
		{
			label: 'i-lucide-grid-3x3',
			value: 'grid',
			description: '中圖示',
		},
		{
			label: 'i-lucide-list',
			value: 'list',
			description: '詳細資料',
		},
	])

	export type SortType = 'name' | 'size' | 'kind' | 'date'

	const sortByOptions: SelectItem[] = [
		{ label: '名稱', value: 'name' },
		{ label: '大小', value: 'size' },
		{ label: '類型', value: 'kind' },
		{ label: '日期', value: 'date' },
	]

	export type OrderType = 'ascending' | 'descending'

	const orderOptions: SelectItem[] = [
		{ label: '升序', value: 'ascending' },
		{ label: '降序', value: 'descending' },
	]
</script>

<template>
	<header class="border-default border-b-2 p-4 sm:px-6 lg:px-8">
		<h1 class="sr-only">{{ title }}</h1>

		<div class="mb-4 flex items-center justify-between">
			<UButton
				icon="i-lucide:arrow-left"
				variant="outline"
				aria-label="回上一層"
				:disabled="breadcrumbItems.length === 1"
				@click="dataStore.moveToNode(stack.length - 2)"
			/>
			<UBreadcrumb
				:items="breadcrumbItems"
				:ui="{
					root: 'ml-4 mr-auto overflow-auto scrollbar-thin',
					item: 'min-w-auto',
				}"
			>
				<template #item="{ item }">
					<UButton
						variant="link"
						:color="
							(
								item.index === stack.length - 1 &&
								(item.index !== 0 || stack.length > 3)
							) ?
								'primary'
							:	'neutral'
						"
						:disabled="item.index === stack.length - 1"
						@click="dataStore.moveToNode(item.index)"
						>{{ item.label }}</UButton
					>
				</template>
				<template #dropdown>
					<LazyUDropdownMenu
						hydrate-on-interaction="mouseover"
						:items="breadcrumbItems[1]!.children"
						:content="{
							align: 'start',
						}"
					>
						<UButton
							:icon="breadcrumbItems[1]!.icon"
							color="neutral"
							variant="link"
						/>
					</LazyUDropdownMenu>
				</template>
			</UBreadcrumb>
			<div class="ml-4">
				<ClientOnly>
					<UFormField>
						<URadioGroup
							v-model="layout"
							:items="radioItems"
							size="xs"
							variant="table"
							indicator="hidden"
							orientation="horizontal"
							:ui="{
								legend: 'sr-only',
								description: 'sr-only',
							}"
						>
							<template #legend>選擇佈局</template>
							<template #label="{ item }">
								<UIcon :name="item.label" class="size-4" />
							</template>
						</URadioGroup>
					</UFormField>
				</ClientOnly>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<UFormField
				label="檔案搜尋"
				:ui="{
					root: 'flex-1',
					label: 'sr-only',
				}"
			>
				<UInput
					v-model="searchValue"
					size="xl"
					placeholder="搜尋檔案或資料夾..."
					:ui="{
						root: 'flex',
					}"
				/>
			</UFormField>
			<!-- html-validate-disable no-missing-references -->
			<UFormField label="排序: " orientation="horizontal">
				<USelect v-model="sortBy" size="xl" :items="sortByOptions" />
			</UFormField>
			<UFormField label="順序: " orientation="horizontal">
				<USelect v-model="order" size="xl" :items="orderOptions" />
			</UFormField>
			<!-- html-validate-disable no-missing-references -->
		</div>
	</header>
</template>

<style lang="scss"></style>
