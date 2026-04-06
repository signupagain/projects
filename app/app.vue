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
			<UMain class="relative">
				<NuxtPage />
			</UMain>
		</NuxtLayout>
	</UApp>
</template>
