import type { DataStructure } from '@/@types/projectDetails'

const project: DataStructure = {
	title: 'ImgShop',
	to: {
		link: 'https://imgshop.netlify.app/',
		linkTarget: '_blank',
	},
	subtitle: '簡易圖片商城',
	github: 'https://github.com/signupagain/imgshop',
	details: {
		skills: [
			{
				logo: VuetifyLogo,
				description: [
					'功能強大，仍努力學習。useTheme、useDisplay及其提供的CSS class很好用。',
					'腳手架內附的插件也很棒，如Eslint、Unplugin系列和vite插件，可惜沒有包含VueDevTool和Prettier',
				],
				maxWidth: 210,
			},
			{
				logo: NetlifyLogo,
				description: [
					'為了不使網站出現官方的404頁面，在netlify.toml和_redirect的用法上做了加強。',
					`後來，採用_redirect處理(netlify.toml亦能處理)。`,
					'值得注意的是其放置位不同於netlify.toml(在根目錄/)，要放在/public下，同時應要有/* /index.html 200。',
					'(以解決SPA上的官方404頁面問題。)',
				],
				maxWidth: 350,
			},
			{
				logo: LodashLogo,
				description: '使用throttle，以防止頻繁向Pexels API發出請求。',
			},
			{
				logo: ViteLogo,
				description: [
					'體驗極佳，上手速度很快，文檔撰寫清楚。',
					'在設置CSSmodule和PostCSS，以及更改SCSS的API("modern-compiler")時，尤其有感。',
				],
				maxWidth: 200,
			},
			{
				logo: Html2CanvasLogo,
				description: '截圖後，用來模擬背景，點擊站內圖片即可見',
			},
			{
				logo: PiniaLogo,
				description: '用其對圖片進行基本的跨組件CRUD',
			},
			{
				logo: I18nextLogo,
				description: [
					'功能強大，文檔提供的開發插件非常好用。因為沒有翻譯，所以沒有提供語言轉換。',
					'僅作為i18n概念的練習使用',
				],
				maxWidth: 200,
			},
		],
	},
	content: {
		type: 'youtube',
		html: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/EvhoprlYMAA?si=HUhotV3IorfCm1vz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
	},
}

export default project
