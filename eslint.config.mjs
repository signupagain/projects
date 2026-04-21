// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default withNuxt(
	// Your custom configs here
	pluginPrettier,
)
