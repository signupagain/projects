const isLocalDev =
	process.env.NETLIFY !== 'true' && process.env.CF_PAGES !== '1'

const getImageProvider = () => {
	if (process.env.NETLIFY === 'true') {
		return 'netlify'
	}

	if (process.env.CF_PAGES === '1') {
		return 'cloudflare'
	}

	return 'ipx'
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	$development: {
		modules: [isLocalDev ? '@artmizu/nuxt-prometheus' : null].filter(Boolean),
	},

	$production: {
		image: {
			provider: getImageProvider(),
		},

		routeRules: {
			'/': { prerender: true },
			'/projects': { prerender: true },
			'/about': { prerender: true },
		},
	},

	modules: [
		'@nuxt/a11y',
		'@nuxt/eslint',
		'@nuxt/hints',
		'@nuxt/image',
		'@nuxt/test-utils/module',
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@nuxt/content',
		'motion-v/nuxt',
	],

	typescript: {
		typeCheck: true,
		tsConfig: {
			include: ['../layers/**/test/**/*.ts'],
		},
		nodeTsConfig: {
			include: [
				'../env.d.ts',
				'../content.config.ts',
				'../layers/**/vitest.*.ts',
			],
		},
	},

	css: ['~/assets/css/main.css'],

	app: {
		head: {
			link: [
				{ rel: 'preconnect', href: 'https://googleapis.com' },
				{ rel: 'preconnect', href: 'https://gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+SC:wght@200..900&display=swap',
				},
			],
		},
	},

	vite: {
		optimizeDeps: {
			include: ['@tanstack/vue-query', 'ms', 'colord'],
		},

		server: {
			watch: {
				ignored: ['**/.nuxt/**', '**/.output/**', '**/*.db*'],
			},
		},
	},

	icon: {
		serverBundle: 'remote',
	},
})
