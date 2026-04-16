<script setup lang="ts">
	const { navLinks: links } = useAppConfig()
</script>

<template>
	<div>
		<UContainer class="border-default pt-10 sm:border-x">
			<AppHeader :links />
			<slot />
		</UContainer>
	</div>
</template>

<style lang="scss"></style>
