import type { DataStructure } from '@/@types/projectDetails'

const project: DataStructure = {
	title: 'VueDemo',
	to: {
		routeName: '/vue-demo/',
	},
	subtitle: '單頁/RWD/實踐',
	details: {
		reference: '简介 | Vue.js',
		href: 'https://cn.vuejs.org/guide/introduction',
	},
	content: {
		type: 'string',
		html: '<p>學習重點:</p><ul><li>RWD: 瞭解到details無法進行open到關閉的動畫，但可以模擬。<a href="https://stackoverflow.com/questions/38213329/how-to-add-css3-transition-with-html5-details-summary-tag-reveal" target="_blank" rel="noopener noreferrer">stackoverflow<i class="fa-solid fa-arrow-up-right-from-square" style="font-size:.8em;vertical-align:0"></i></a></li><li>scrollBehaivor: 延遲滾動使頁面過渡更加絲滑，也有使用到to.hash進行本地目錄的綠點滑動。</li><li>highlight.js: 使用其提供之vue組件，其提供的code接口十分好用。</li><li>狀態管理: 分別使用pinia簡單紀錄transition過渡，和vue原生的reactive的簡單store紀錄頁面位置。</li><li>vite-plugin-vue-layouts: 瞭解其作用域無法訪問definePage。</li></ul>',
	},
}

export default project
