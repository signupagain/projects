import type { DataStructure } from '@/@types/projectDetails'

const project: DataStructure = {
	title: 'Steps',
	to: {
		routeName: '/steps/',
	},
	subtitle: 'defineModel/transition',
	details: {
		reference: 'Step Indicator',
		href: 'https://codepen.io/jkantner/pen/KKLXjbK?editors=0100',
	},
	content: {
		type: 'string',
		html: '<p>練習使用新的defineModel與其validator，還有不同狀態下的class切換動畫。</p>',
	},
}

export default project
