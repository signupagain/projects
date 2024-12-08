interface IData {
	title: string
	list: string[]
}

const data: IData[] = [
	{ title: '開始', list: ['简介', '快速上手'] },
	{
		title: '基础',
		list: [
			'创建一个应用',
			'模板语法',
			'响应式基础',
			'计算属性',
			'类与样式绑定',
			'条件渲染',
			'列表渲染',
			'事件处理',
			'表单输入绑定',
			'生命周期',
			'侦听器',
			'模板引用',
			'组件基础',
		],
	},
	{
		title: '深入组件',
		list: [
			'注册',
			'Props',
			'事件',
			'组件 v-model',
			'透传 Attributes',
			'插槽',
			'依赖注入',
			'异步组件',
		],
	},
	{
		title: '逻辑复用',
		list: ['组合式函数', '自定义指令', '插件'],
	},
	{
		title: '内置组件',
		list: [
			'Transition',
			'TransitionGroup',
			'KeepAlive',
			'Teleport',
			'Suspense',
		],
	},
	{
		title: '应用规模化',
		list: [
			'单文件组件',
			'工具链',
			'路由',
			'状态管理',
			'测试 ',
			'服务端渲染 (SSR)',
		],
	},
	{
		title: '最佳实践',
		list: ['生产部署', '性能优化', '无障碍访问', '安全'],
	},
	{ title: 'TypeScript', list: ['总览', 'TS 与组合式 API', 'TS 与选项式 API'] },
	{
		title: '进阶主题',
		list: [
			'使用 Vue 的多种方式',
			'组合式 API 常见问答',
			'深入响应式系统',
			'渲染机制',
			'渲染函数 & JSX',
			'Vue 与 Web Components',
			'动画技巧',
		],
	},
]

export default data
