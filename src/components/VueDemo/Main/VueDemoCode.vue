<template>
	<div :class="$style.frame">
		<span :class="$style.theme" v-text="theme"></span>
		<button :class="$style.btn" type="button">
			<v-icon
				icon="far fa-clipboard"
				size="small"
				style="margin: 0 -2px 0 0"
			></v-icon>
		</button>
		<highlightjs autodetect :code />
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		theme: string
		code: string
	}>()
</script>

<style lang="scss" module>
	.frame {
		position: relative;
		background: var(--vuedemo-surface);
		border-radius: 8px;
		border: 5px solid transparent;

		padding: 14px 24px;
		margin: 14px 0;

		& pre {
			white-space: pre-wrap;
		}
	}

	.theme,
	.btn {
		position: absolute;
		right: 0;
		top: 0;
	}

	.theme {
		color: rgba(235, 235, 235, 0.38);
		right: 6px;
		font-size: 12px;
		font-weight: 500;
	}

	.btn {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 8px;
		z-index: 1;

		opacity: 0;
		transition: opacity 0.4s;

		.frame:hover & {
			background: #2f2f2f;
			opacity: 1;
		}
	}

	:global(.hljs) {
		background: var(--vuedemo-surface);
	}
</style>
