<template>
	<div :class="$style.wrap">
		<router-view style="grid-area: top" name="Header" />
		<div :class="$style['mb-nav']">
			<button type="button" :class="$style['mb-site']">
				<v-icon icon="fas fa-align-left" size="small"></v-icon>
				菜单
			</button>
			<button type="button" :class="$style['mb-menu']">
				本页目录
				<v-icon icon="fas fa-chevron-right" size="small"></v-icon>
			</button>
		</div>
		<router-view style="grid-area: main" />
		<router-view style="grid-area: left" name="Navigation" />
		<router-view name="Widget" />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
	.wrap {
		background: var(--vuedemo-background);
		width: 100%;

		display: grid;
		grid:
			'top top top' auto
			'left main main' 1fr
			/ auto 1fr 1fr;

		font-family:
			Quotes,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Fira Sans',
			'Helvetica Neue',
			sans-serif;

		& a {
			text-decoration: none;
		}

		:root:has(&) {
			scrollbar-color: #454a4d #202324;
		}

		@media (max-width: 960px) {
			display: block;
		}
	}

	.mb-nav {
		display: none;

		@media (max-width: 960px) {
			display: flex;
			justify-content: space-between;

			color: var(--vuedemo-on-surface);
			font-size: 12px;
			line-height: 47px;
			border-bottom: 1px solid rgba(84, 84, 84, 0.48);
			background: var(--vuedemo-background);
		}
	}

	.mb-site {
		padding: 0 32px;
	}

	.mb-menu {
		padding: 0 20px;
	}
</style>
