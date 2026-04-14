import { defineCollection, defineContentConfig } from '@nuxt/content'
import * as z from 'zod'

export default defineContentConfig({
	collections: {
		index: defineCollection({
			type: 'page',
			source: 'index.yml',
			schema: z.object({
				hero: z.array(
					z.object({
						'aria-label': z.string(),
						icon: z.string(),
						color: z.string(),
					}),
				),
			}),
		}),
	},
})
