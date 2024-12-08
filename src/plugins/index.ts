/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// Types
import type { App } from 'vue'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)

export function registerPlugins(app: App) {
	app
		.use(vuetify)
		.use(router)
		.use(pinia)
		.use(Particles, {
			init: async engine => {
				await loadSlim(engine)
			},
		})
		.use(hljsVuePlugin)
}
