<script setup lang="ts">
	const { navLinks, links: footerLinks, credits } = useAppConfig()
</script>

<template>
	<div>
		<UContainer class="border-default pt-10 sm:border-x">
			<AppHeader :links="navLinks" />
			<slot />
			<AppFooter :credits :links="footerLinks" />
		</UContainer>
	</div>
</template>

<style lang="scss"></style>
