import type { DataStructure } from '@/@types/projectDetails'

const project: DataStructure = {
	title: 'Colorful Bars',
	to: {
		routeName: '/colorful-bar/',
	},
	subtitle: 'CSS_Only/:has練習',
	details: {
		reference: 'Crazy CSS Using By Master CSS',
		href: 'https://www.youtube.com/watch?v=P80sM7ausCA&t=253s',
	},
	content: {
		type: 'string',
		html: '<p>hover在圖塊上等待即可展示。</p><p>使用:has捕獲前元素，以及練習perspective。</p>',
	},
}

export default project
