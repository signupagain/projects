type nestedArray = Array<{
	value: string
	isBlank?: true
	children?: nestedArray
}>

interface IData {
	value: string
	hasGroup?: true
	children?: nestedArray
}

export const vueDemoHeaderListData: IData[] = [
	{
		value: '文档',
		children: [
			{
				value: '深度指南',
			},
			{
				value: '互动教程',
			},
			{
				value: '示例',
			},
			{
				value: '快速上手',
			},
			{
				value: '术语表',
			},
			{
				value: '错误码参照表',
			},
			{
				value: 'Vue 2 文档',
				isBlank: true,
			},
			{
				value: '从 Vue 2 迁移',
				isBlank: true,
			},
		],
	},
	{
		value: 'API',
	},
	{ value: '演练场' },
	{
		value: '生态系统',
		hasGroup: true,
		children: [
			{
				value: '资源',
				children: [
					{
						value: '合作伙伴',
					},
					{
						value: '主题',
					},
					{
						value: 'UI組件',
						isBlank: true,
					},
					{
						value: '證書',
						isBlank: true,
					},
					{
						value: '找工作',
						isBlank: true,
					},
					{ value: 'T-Shirt商店', isBlank: true },
				],
			},
			{
				value: '官方庫',
				children: [
					{
						value: 'Vue Router',
						isBlank: true,
					},
					{ value: 'Pinia', isBlank: true },
					{ value: '工具鏈指南' },
				],
			},
			{
				value: '視頻課程',
				children: [
					{ value: 'Vue Master', isBlank: true },
					{ value: 'Vue School', isBlank: true },
				],
			},
			{
				value: '幫助',
				children: [
					{ value: 'Discord 聊天室', isBlank: true },
					{ value: 'GitHub 論壇', isBlank: true },
					{ value: 'DEV Community', isBlank: true },
				],
			},
			{
				value: '動態',
				children: [
					{
						value: '博客',
						isBlank: true,
					},
					{ value: 'Twitter', isBlank: true },
					{
						value: '活動',
						isBlank: true,
					},
					{
						value: '新聞簡報',
					},
				],
			},
		],
	},
	{
		value: '關於',
		children: [
			{
				value: '常见问题',
			},
			{
				value: '团队',
			},
			{
				value: '版本发布',
			},
			{
				value: '社区指南',
			},
			{
				value: '行为规范',
			},
			{
				value: '隐私政策',
			},
			{
				value: '纪录片',
				isBlank: true,
			},
		],
	},
	{ value: '贊助' },
	{ value: '合作伙伴' },
]

export const vueDemoLanguages = [
	'English',
	'日本語',
	'Українська',
	'Français',
	'한국어',
	'Português',
	'বাংলা',
	'Italiano',
	'فارسی',
	'Русский',
	'Čeština',
	'繁體中文',
]
