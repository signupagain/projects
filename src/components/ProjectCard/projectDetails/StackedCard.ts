import type { DataStructure } from '@/@types/projectDetails'

const project: DataStructure = {
	title: 'StackedCard',
	to: {
		routeName: '/stacked-card/',
	},
	subtitle: '單頁/點擊翻牌/line-clamp',
	details: {
		reference: 'Stacked Cards with Autoplay | Vanilla Javascript & CSS',
		href: 'https://codepen.io/ecemgo/pen/yLWJvQx',
	},
	content: {
		type: 'string',
		html: '<p>切板分成兩部份，Lorem ipsum生成和翻轉圖卡。</p><p>學習重點如下:</p><ul><li>line-clamp: 生成多行效果，特點是可帶有ellipsis(...)</li><li>The Key Changing Technique: 使用v-for的key值進行元素刷新。<a href="https://michaelnthiessen.com/key-changing-technique/" target="_blank" rel="noopener noreferrer">相關Blog<i class="fa-solid fa-arrow-up-right-from-square fa-xs" style="vertical-align:0"></i></a></li>',
	},
}

export default project
