<template>
	<div :class="$style.wrap">
		<VueDemoNavigationDetails />
		<VueDemoNavigationList />
		<a
			:class="$style.link"
			href="/"
			target="_blank"
			rel="noopener noreferrer"
			@click.prevent
		>
			获取针对 Vue 2 的安全更新
			<v-icon
				icon="fas fa-arrow-up-right-from-square"
				style="font-size: 0.9em; vertical-align: 0"
			></v-icon>
		</a>
	</div>
</template>

<script setup lang="ts">
	definePage({
		meta: {
			layout: 'vue-demo',
		},
	})
</script>

<style lang="scss" module>
	$pc-maxW: 272px;
	$mb-maxW: 320px;

	.wrap {
		position: sticky;
		top: 55px;
		width: $pc-maxW;
		padding: 0 2rem 6rem;
		max-height: calc(100dvh - 55px);
		overflow: auto;

		&:global(.active) {
			width: $mb-maxW;
			top: 0;
			transform: translate(0);
		}

		@media (max-width: 960px) {
			position: fixed;
			z-index: 3;
			transform: translate(-100%);
			background: var(--vuedemo-background);
			visibility: none;
		}
	}

	.link {
		font-size: 12px;
		font-weight: 500;
		border-radius: 8px;
		padding: 4px 8px;
		border: 2px solid transparent;
		color: #aac8e4;
		background:
			linear-gradient(#2f2f2f, #2f2f2f) padding-box,
			linear-gradient(45deg, #42d392, #647eff) border-box;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
