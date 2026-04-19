export default defineNuxtPlugin({
	name: 'error-handler',
	setup(nuxtApp) {
		const callCreateError = (error: unknown) => {
			if (import.meta.env.DEV) {
				throw createError(
					(
						isNuxtError(error) ||
							error instanceof Error ||
							typeof error === 'string'
					) ?
						error
					:	JSON.stringify(error),
				)
			}

			throw createError('未知錯誤')
		}

		nuxtApp.hook('app:error', callCreateError)
		nuxtApp.hook('vue:error', callCreateError)
	},
})
