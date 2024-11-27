<template>
	<div
		:class="$style.wrap"
		lang="en"
		style="
			background: linear-gradient(145deg, #55566a 0%, #131318 76%);
			min-height: 100dvh;
			hyphens: auto;
		"
	>
		<FakeContent :class="$style.content" />
		<FlipCard :class="$style.card" />
	</div>
</template>

<script setup lang="ts">
	definePage({
		meta: {
			title: 'StackedCard',
		},
	})
</script>

<style lang="scss" module>
	.wrap {
		display: flex;
		align-items: center;
		padding: 60px;
		gap: 24px;
		overflow: hidden;

		@media (max-width: 1100px) {
			flex-flow: column-reverse;
			gap: 60px;
		}

		@media (max-width: 530px) {
			gap: 30px;
			padding: 2em;
		}

		@media (max-width: 530px) {
			padding: 1em;
		}
	}

	.content {
		flex: 50%;

		@media (max-width: 1100px) {
			flex: auto;
		}
	}

	.card {
		flex: 50%;

		@media (max-width: 1100px) {
			flex: 400px;
		}
	}
</style>
