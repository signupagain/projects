import type {
	InferContractRouterInputs,
	InferContractRouterOutputs,
} from '@orpc/contract'
import type * as z from 'zod'

type Input = InferContractRouterInputs<typeof pexelsContracts.server.getPhoto>
type Output = InferContractRouterOutputs<typeof pexelsContracts.server.getPhoto>

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	const params = (await getValidatedRouterParams(
		event,
		getPhotoParamsValidator,
	)) satisfies z.ZodSafeParseResult<Input>

	try {
		if (params.error) {
			throw new Error(`Invalid input: ${params.error.message}`)
		}

		if (!Number.isInteger(params.data.id)) {
			throw new Error(`Invalid input: 'id' must be an integer`)
		}

		const data = await $fetch<Output>(`/photos/${params.data.id}`, {
			baseURL: config.pexelsURL,
			headers: {
				Authorization: config.pexelsToken,
			},
			timeout: 5000,
		})

		const modifiedData = PhotoResponseSchema.parse(data)

		return modifiedData
	} catch (error) {
		const data = error instanceof Error ? error : JSON.stringify(error)

		throw createError(data)
	}
})
