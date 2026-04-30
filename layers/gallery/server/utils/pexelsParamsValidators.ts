import * as z from 'zod'

export const getPhotoParamsValidator = z.object({
	id: z.string().transform((val) => +val),
}).safeParse

const pagenationSchema = z.object({
	per_page: z
		.string()
		.transform((val) => +val)
		.refine((val) => Number.isInteger(val) && val >= 1 && val <= 80, {
			message: "'per_page' must be an integer between 1 and 80",
		})
		.optional(),
	page: z
		.string()
		.transform((val) => +val)
		.refine((val) => Number.isInteger(val) && val >= 1, {
			message: "'page' must be an integer greater than or equal to 1",
		})
		.optional(),
})

export const getCuratedParamsValidator = pagenationSchema.safeParse

export const getSearchParamsValidator = z.object({
	...pagenationSchema.shape,
	...SearchRequestSchema.pick({
		query: true,
		orientation: true,
		size: true,
		color: true,
		locale: true,
	}).shape,
}).safeParse
