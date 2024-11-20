/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import '@/styles/main.scss'

// Composables
import { createVuetify } from 'vuetify'
import { purpleTheme } from './customTheme'
import { aliases, fa } from 'vuetify/iconsets/fa'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	theme: {
		defaultTheme: 'purpleTheme',
		themes: {
			purpleTheme,
		},
	},
	display: {
		mobileBreakpoint: 'sm',
		thresholds: {
			xs: 0,
			sm: 340,
			md: 755,
			lg: 1170,
			xl: 1280,
		},
	},
	icons: {
		defaultSet: 'fa',
		aliases,
		sets: { fa },
	},
})
