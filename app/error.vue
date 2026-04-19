<script setup lang="ts">
	import type { NuxtError } from '#app'

	const { error } = defineProps<{
		error: NuxtError
	}>()

	useHead({
		htmlAttrs: {
			lang: 'zh-Hant-TW',
		},
	})

	useSeoMeta({
		title: error.status + ' - ' + error.message,
	})

	const { navLinks, credits, links: footerLinks } = useAppConfig()
</script>

<template>
	<div>
		<AppHeader :links="navLinks" />

		<UMain>
			<UContainer>
				<UPage>
					<UError :error="error" />
				</UPage>
			</UContainer>
		</UMain>

		<AppFooter :credits :links="footerLinks" />
	</div>
</template>

<style lang="scss"></style>
