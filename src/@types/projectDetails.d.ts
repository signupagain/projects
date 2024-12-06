import type { RouteNamedMap } from 'vue-router/auto-routes'

export {}

interface ILink {
	link: string
	linkTarget:
		| '_self'
		| '_blank'
		| '_parent'
		| '_top'
		| '_unfencedTop'
		| (string & {})
}

interface IRoute {
	routeName: keyof RouteNamedMap
}

export interface DataStructure {
	title: string
	to: XOR<ILink, IRoute>
	subtitle: string
	github?: string
	details: XOR<
		{
			skills: Array<{
				logo: string
				maxWidth?: number
				description: string | string[]
			}>
		},
		{ reference: string; href: string }
	>
	content: {
		type: 'youtube' | 'string'
		html: string
	}
}
