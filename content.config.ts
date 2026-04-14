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
				about: z.object({
					title: z.string(),
					description: z.string(),
				}),
				experience: z.object({
					title: z.string(),
					items: z.array(
						z.object({
							position: z.string(),
							date: z.string(),
							company: z.object({
								name: z.string(),
								url: z.url(),
								color: z.string(),
							}),
						}),
					),
				}),
			}),
		}),
	},
})
