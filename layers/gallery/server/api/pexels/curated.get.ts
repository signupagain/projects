import type {
	InferContractRouterInputs,
	InferContractRouterOutputs,
} from '@orpc/contract'
import * as z from 'zod'

type Input = InferContractRouterInputs<
	typeof pexelsContracts.server.curatedPhotos
>
type Output = InferContractRouterOutputs<
	typeof pexelsContracts.server.curatedPhotos
>

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	const params = (await getValidatedQuery(
		event,
		getCuratedParamsValidator,
	)) satisfies z.ZodSafeParseResult<Input>

	try {
		if (params.error) {
			throw new Error(`Invalid input: ${params.error.message}`)
		}

		if (
			params.data.per_page !== undefined &&
			!Number.isInteger(params.data.per_page)
		) {
			throw new Error(`Invalid input: 'per_page' must be an integer`)
		}

		if (params.data.page !== undefined && !Number.isInteger(params.data.page)) {
			throw new Error(`Invalid input: 'page' must be an integer`)
		}

		const data = await $fetch<Output>('/curated', {
			baseURL: config.pexelsURL,
			headers: {
				Authorization: config.pexelsToken,
			},
			timeout: 5000,
			params: params.data,
		})

		const modifiedData = z
			.object({
				...SearchResponseSchema.shape,
				photos: z.array(PhotoResponseSchema),
			})
			.parse(data)

		return modifiedData
	} catch (error) {
		const data = error instanceof Error ? error : JSON.stringify(error)

		throw createError(data)
	}
})
