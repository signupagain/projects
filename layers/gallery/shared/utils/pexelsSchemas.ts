import * as z from 'zod'

/**
 * Pexels API response schemas (Zod)
 * Reference: https://www.pexels.com/api/documentation/?language=javascript
 */

const PhotoSrcSchema = z.object({
	// original: z.url(),
	large2x: z.url(),
	large: z.url(),
	// medium: z.url(),
	small: z.url(),
	// portrait: z.url(),
	// landscape: z.url(),
	// tiny: z.url(),
})

export const PhotoSchema = z.object({
	id: z.number(),
	width: z.number(),
	height: z.number(),
	url: z.url(),
	photographer: z.string(),
	photographer_url: z.url(),
	// photographer_id: z.number(),
	avg_color: z.string(),
	src: PhotoSrcSchema,
	// liked: z.boolean().default(false), // useless property, always false
	alt: z.string(),
})

export const PhotoRequestSchema = z.object({
	id: z.int(),
})

export const PhotoResponseSchema = PhotoSchema

export const CuratedRequestSchema = z.object({
	per_page: z.int().min(1).max(80).default(15).optional(),
	page: z.int().min(1).default(1).optional(),
})

export const CuratedResponseSchema = z.object({
	page: z.number(),
	per_page: z.number(),
	photos: z.array(PhotoSchema),
	total_results: z.number(),
	next_page: z.url().optional(),
	prev_page: z.url().optional(),
})

export const SearchRequestStatics = {
	orientation: ['landscape', 'portrait', 'square'],
	size: ['large', 'medium', 'small'],
	color: {
		enum: [
			'red',
			'orange',
			'yellow',
			'green',
			'turquoise',
			'blue',
			'violet',
			'pink',
			'brown',
			'black',
			'gray',
			'white',
		],
		regex: /^#([0-9A-F]{3}){1,2}$/i,
	},
	locale: [
		'en-US',
		'pt-BR',
		'es-ES',
		'ca-ES',
		'de-DE',
		'it-IT',
		'fr-FR',
		'sv-SE',
		'id-ID',
		'pl-PL',
		'ja-JP',
		'zh-TW',
		'zh-CN',
		'ko-KR',
		'th-TH',
		'nl-NL',
		'hu-HU',
		'vi-VN',
		'cs-CZ',
		'da-DK',
		'fi-FI',
		'uk-UA',
		'el-GR',
		'ro-RO',
		'nb-NO',
		'sk-SK',
		'tr-TR',
		'ru-RU',
	],
} as const

export const SearchRequestSchema = z.object({
	...CuratedRequestSchema.shape,
	query: z.string().nonempty(),
	orientation: z.enum(SearchRequestStatics.orientation).optional(),
	size: z.enum(SearchRequestStatics.size).optional(),
	color: z
		.union([
			z.enum(SearchRequestStatics.color.enum),
			z.string().regex(SearchRequestStatics.color.regex, 'Invalid hex color'),
		])
		.optional(),
	locale: z.enum(SearchRequestStatics.locale).optional(),
})

export const SearchResponseSchema = CuratedResponseSchema
