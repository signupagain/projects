<template>
	<details ref="details" :class="$style.details" open>
		<summary :class="$style.summary">
			<span>API 风格偏好</span>
			<v-icon
				:icon="isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
				size="x-small"
				style="vertical-align: 0.1ex"
			></v-icon>
		</summary>
		<div :class="$style.content">
			<label for="themeToggle" @click.prevent>选项式</label>
			<button id="themeToggle" :class="[$style.btn, 'active']" type="button">
				<div :class="$style['btn-icon']"></div>
			</button>
			<label class="active" for="themeToggle" @click.prevent>组合式</label>
			<v-icon
				style="color: var(--vuedemo-primary)"
				title="關於API風格偏好"
				icon="far fa-circle-question"
			></v-icon>
		</div>
	</details>
</template>

<script setup lang="ts">
	const isOpen = ref(true)
	const details = useTemplateRef('details')

	useEvent(details, 'toggle', (e: Event) => {
		if (e instanceof ToggleEvent) isOpen.value = e.newState === 'open'
	})
</script>

<style lang="scss" module>
	.details {
		position: sticky;
		top: 0;
		color: var(--vuedemo-on-surface);
		padding-top: 34px;
		border-bottom: 1px solid currentColor;
		margin-bottom: 20px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: -0.5px;
		background: var(--vuedemo-background);
		overflow: hidden;

		&[open] summary {
			padding-bottom: 15px;
		}
	}

	.summary {
		cursor: pointer;
		list-style: none;
		color: rgba(235, 235, 235, 0.6);
		font-size: 13px;
		padding-bottom: 5px;
		transition: padding-bottom 0.5s;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content {
		margin: 6px 0 12px;
		padding: 1em;
		background: var(--vuedemo-surface);
		border-radius: 8px;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	label:global(.active) {
		color: var(--vuedemo-on-background);
	}

	.btn {
		margin-left: 8px;
		width: 40px;
		height: 20px;
		border-radius: 11px;
		background: #2f2f2f;
		border: 1px solid rgba(84, 84, 84, 0.65);
		position: relative;
		transform: scale(0.8);

		&:hover {
			border-color: var(--vuedemo-on-surface);
		}
	}

	.btn-icon {
		width: 18px !important;
		height: 18px !important;
		position: absolute !important;
		top: 0.5px;
		left: 1px;
		border-radius: 50%;
		background: #1a1a1a;

		:global(.active) & {
			transform: translate(18px);
		}
	}
</style>
