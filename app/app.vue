<script setup lang="ts">
	useHead({
		htmlAttrs: {
			lang: 'zh-Hant-TW',
		},
	})
</script>

<template>
	<UApp>
		<NuxtRouteAnnouncer />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
