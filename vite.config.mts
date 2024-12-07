// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import VueDevTools from 'vite-plugin-vue-devtools'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VueRouter({
			dts: 'src/typed-router.d.ts',
		}),
		Layouts(),
		AutoImport({
			imports: [
				'vue',
				{
					'vue-router/auto': ['useRoute', 'useRouter'],
				},
				{
					from: 'swiper/element',
					type: true,
					imports: ['SwiperContainer'],
				},
				{
					from: 'swiper/types',
					type: true,
					imports: ['SwiperOptions'],
				},
				{
					'swiper/modules': ['Navigation'],
				},
				{
					html2canvas: [['default', 'html2canvas']],
				},
				{
					'lorem-ipsum': ['LoremIpsum'],
				},
				{
					nanoid: ['nanoid'],
				},
				{
					'lodash-es': ['throttle'],
				},
			],
			dts: 'src/auto-imports.d.ts',
			eslintrc: {
				enabled: true,
			},
			vueTemplate: true,
			dirs: [
				'src/assets/logos',
				'src/components/**/*',
				'src/use/**/*',
				'src/stores/*',
			],
		}),
		Components({
			dts: 'src/components.d.ts',
		}),
		Vue({
			template: {
				transformAssetUrls,
				compilerOptions: {
					isCustomElement: tag => {
						const prefixs = ['swiper-']
						return prefixs.some(prefix => tag.includes(prefix))
					},
				},
			},
		}),
		// https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
		Vuetify({
			autoImport: true,
			styles: {
				configFile: 'src/styles/settings.scss',
			},
		}),
		Fonts({
			google: {
				families: [
					{
						name: 'Roboto',
						styles: 'wght@100;300;400;500;700;900',
					},
				],
			},
		}),
		VueDevTools(),
	],
	define: { 'process.env': {} },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
	},
	server: {
		port: 3000,
	},
	css: {
		preprocessorOptions: {
			sass: {
				api: 'modern-compiler',
			},
		},
	},
})
