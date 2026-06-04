import type {
	LayoutType,
	OrderType,
	SortType,
} from '../components/fileBrowser/Header.vue'

interface ItemBaseType {
	id: string
	name: string
	path: string
	created: number
	modified: number

	size?: number
	extension?: string
}

interface ItemFileType extends ItemBaseType {
	type: 'file'
}

interface ItemFolderType extends ItemBaseType {
	type: 'folder'
	children: DataSeedItemType[]
}

export type DataSeedItemType = ItemFileType | ItemFolderType

interface Extension {
	name: string
	label: string
}

interface FileGroup {
	icon: string
	color: string
	extensions: Extension[]
}

type DataSeedFileTypes = FileGroup[]

type DataSeedFileTypeMap = Map<
	Extension['name'],
	Omit<FileGroup, 'extensions'> & { label: Extension['label'] }
>

type NodeStack = Array<{
	dirname: string
	folder: ItemFolderType | null
	nodes: DataSeedItemType[]
}>

export const useFileBrowserDataStore = defineStore('FileBrowserData', () => {
	const config = useRuntimeConfig()

	const layout = ref<LayoutType>('grid')

	/**
	 * This is used to trigger reactivity when the data changes, such as after deletion.
	 */
	const nodeStackVersion = ref<number>(0)

	const nodeStack = shallowRef<NodeStack>([])
	const currentNode = computed(() => nodeStack.value.at(-1) || null)

	const fileTypes = ref<DataSeedFileTypes | null>(null)
	const fileTypeMap = computed(() => {
		const map: DataSeedFileTypeMap = new Map()

		fileTypes.value?.forEach((group) => {
			group.extensions.forEach((ext) => {
				map.set(ext.name, {
					icon: group.icon,
					color: group.color,
					label: ext.label,
				})
			})
		})

		return map
	})

	const searchValue = ref<string>('')

	const searchFn = (item: DataSeedItemType) =>
		item.name.includes(searchValue.value)

	const order = ref<OrderType>('ascending')

	const orderFn = (value: number) =>
		isNaN(value) ? 0 : value * (order.value === 'ascending' ? 1 : -1)

	const sortBy = ref<SortType>('kind')

	const filterFn = {
		name: (a, b) => orderFn(a.name.localeCompare(b.name)),
		size: (a, b) => orderFn((a.size ?? 0) - (b.size ?? 0)),
		kind: (a, b) =>
			orderFn((a.extension || '').localeCompare(b.extension || '')),
		date: (a, b) => orderFn(a.modified - b.modified),
	} satisfies Record<
		SortType,
		(a: DataSeedItemType, b: DataSeedItemType) => number
	>

	const displayedNode = computed(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		nodeStackVersion.value

		return (currentNode.value?.nodes || [])
			.filter(searchFn)
			.sort(filterFn[sortBy.value])
	})

	const currentFolderCount = computed(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		nodeStackVersion.value

		return (
			currentNode.value?.nodes.filter((item) => item.type === 'folder')
				.length || 0
		)
	})

	const currentFileCount = computed(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		nodeStackVersion.value

		return (
			currentNode.value?.nodes.filter((item) => item.type === 'file').length ||
			0
		)
	})

	function _pushNodes(nodes: NodeStack | NodeStack[number]) {
		if (Array.isArray(nodes)) {
			nodeStack.value = [...nodeStack.value, ...nodes]
		} else {
			nodeStack.value.push(nodes)
		}

		triggerRef(nodeStack)
	}

	async function initialize() {
		if (nodeStack.value.length > 0) {
			return
		}

		try {
			const dataResponse = await fetch(
				`${config.public.baseURL}/file-browser.json`,
			)
			const fileTypesResponse = await fetch(
				`${config.public.baseURL}/file-browser-types.json`,
			)

			const dataJson: DataSeedItemType[] = await dataResponse.json()
			const fileTypesJson: DataSeedFileTypes = await fileTypesResponse.json()

			_pushNodes({ dirname: 'root', folder: null, nodes: dataJson })
			fileTypes.value = fileTypesJson
		} catch (error) {
			console.error('getDataSeed error:\n', error)

			throw createError({
				message: 'getDataSeed returned no data',
				fatal: true,
			})
		}
	}

	function moveToNode(id: DataSeedItemType['id']) {
		if (currentNode.value === null) {
			throw createError('currentNode should not be null.')
		}

		const target = currentNode.value.nodes.find((node) => node.id === id)!

		if (target.type !== 'folder') {
			throw createError('target should be a folder.')
		}

		_pushNodes([
			{ dirname: target.name, folder: target, nodes: target.children },
		])
	}

	function backToNode(index: number) {
		nodeStack.value.length = index + 1
		deleteFocusItem()
		clearSelectedItems()
		triggerRef(nodeStack)
	}

	function deleteNodeItems() {
		if (selectedItems.value.size === 0) {
			throw createError('No items selected for deletion.')
		}

		const indexes: number[] = []

		currentNode.value?.nodes.forEach((node, idx) => {
			if (selectedItems.value.has(node.id)) {
				indexes.push(idx)
			}
		})

		const list = nodeStack.value.at(-1)!.nodes
		let write = indexes[0]!
		let delIdx = 0

		for (let read = indexes[0]!; read < list.length; read++) {
			if (delIdx < indexes.length && read === indexes[delIdx]) {
				delIdx++
			} else {
				list[write] = list[read]!
				write++
			}
		}

		nodeStack.value[nodeStack.value.length - 1]!.nodes.length = write
		triggerRef(nodeStack)
		nodeStackVersion.value++
	}

	const focusItem = ref<ItemFileType | null>(null)
	const isDrawerOpen = ref(false)

	function setFocusItem(id: DataSeedItemType['id']) {
		const target =
			currentNode.value?.nodes.find((node) => node.id === id) || null

		if (target?.type !== 'file') {
			throw createError('target with id should be a file.')
		}

		focusItem.value = target
	}

	function deleteFocusItem() {
		focusItem.value = null
	}

	const selectedItems = ref<Set<DataSeedItemType['id']>>(new Set())

	const selectedItemsCount = computed(() => selectedItems.value.size)

	function pushSelectedItems(
		id: DataSeedItemType['id'][] | DataSeedItemType['id'],
	) {
		if (Array.isArray(id)) {
			selectedItems.value = new Set([...selectedItems.value, ...id])
		} else {
			selectedItems.value.add(id)
		}
	}

	function deleteSelectedItem(id: DataSeedItemType['id']) {
		return selectedItems.value.delete(id)
	}

	function clearSelectedItems() {
		selectedItems.value.clear()
	}

	return {
		layout,
		dataVersion: nodeStackVersion,

		nodeStack,
		currentNode,

		fileTypes,
		fileTypeMap,

		searchValue,
		order,
		sortBy,

		displayedNode,
		currentFolderCount,
		currentFileCount,

		_pushNodes,
		initialize,
		moveToNode,
		backToNode,
		deleteNodeItems,

		focusItem,
		isDrawerOpen,
		setFocusItem,
		deleteFocusItem,

		selectedItems,
		selectedItemsCount,
		pushSelectedItems,
		deleteSelectedItem,
		clearSelectedItems,
	}
})
