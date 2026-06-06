import fs from 'fs'
import path from 'path'

const certKeyPath = path.resolve(process.cwd(), 'certs/localhost-key.pem')
const certCertPath = path.resolve(process.cwd(), 'certs/localhost.pem')

const useLocalHttps =
	process.env.NETLIFY !== 'true' && // skip on Netlify
	process.env.CF_PAGES !== '1' && // skip on Cloudflare Pages
	fs.existsSync(certKeyPath) &&
	fs.existsSync(certCertPath)

const getImageProvider = () => {
	if (process.env.NETLIFY === 'true') {
		return 'netlify'
	}

	if (process.env.CF_PAGES === '1') {
		return 'cloudflare'
	}

	return 'ipx'
}

export default defineNuxtConfig({
	$development: {
		devServer: {
			...(useLocalHttps ?
				{
					https: {
						key: fs.readFileSync(certKeyPath).toString(),
						cert: fs.readFileSync(certCertPath).toString(),
					},
				}
			:	{}),
			host: '0.0.0.0',
			port: 3000,
		},
	},

	$production: {
		image: {
			provider: getImageProvider(),
		},

		routeRules: {
			'/gallery/**': { isr: 60 * 30 },
		},
	},

	extends: ['../colorModeBtn', '../speedDials'],

	runtimeConfig: {
		pexelsURL: process.env.PEXELS_URL,
		pexelsToken: process.env.PEXELS_TOKEN,
	},

	image: {
		domains: ['images.pexels.com'],
		alias: {
			pexels: 'https://images.pexels.com/photos',
		},
	},

	modules: [
		'@nuxt/image',
		'@nuxt/test-utils/module',
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@peterbud/nuxt-query',
		'@vueuse/nuxt',
	],

	nuxtQuery: {
		queryClientOptions: {
			defaultOptions: {
				queries: {
					staleTime: 1000 * 60 * 5, // 5 minutes
				},
			},
		},
	},

	experimental: {
		typedPages: true,
	},
})
