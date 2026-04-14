// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	modules: [
		'@nuxt/a11y',
		'@nuxt/eslint',
		'@nuxt/hints',
		'@nuxt/image',
		'@nuxt/test-utils',
		'@nuxt/ui',
		'@artmizu/nuxt-prometheus',
		'@vueuse/nuxt',
		'@nuxt/content',
		'motion-v/nuxt',
	],

	typescript: {
		typeCheck: true,
		nodeTsConfig: {
			include: ['../env.d.ts', '../content.config.ts'],
		},
	},

	runtimeConfig: {
		pexelToken: process.env.PEXEL_TOKEN,
	},

	css: ['~/assets/css/main.css'],
})
