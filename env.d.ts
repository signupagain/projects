declare namespace NodeJS {
	interface ProcessEnv {
		/* Pexels API */
		readonly PEXELS_URL: string
		readonly PEXELS_TOKEN: string

		/* VueQuery */
		readonly VUE_QUERY_STALE_TIME: string

		/* Nelify */
		readonly NETLIFY: string // "true" / "false"
		readonly URL: string

		/* Cloudflare */
		readonly CF_PAGES: string // "1" / "0"
		readonly CF_PAGES_URL: string
	}
}
