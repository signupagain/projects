import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		title?: string
		transition?: string
		color?: {
			vueDemo?: {
				background: string
				surface: string
				primary: string
				'primary-dark1': string
				'primary-dark2': string
				secondary: string
				accent: string
				'on-background': string
				'on-surface': string
			}
		}
	}
}
