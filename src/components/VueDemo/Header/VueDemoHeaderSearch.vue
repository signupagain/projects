<template>
	<div style="padding-left: 1rem">
		<button type="button" :class="$style.btn" @click.prevent>
			<svg
				width="20"
				height="20"
				class="DocSearch-Search-Icon"
				viewBox="0 0 20 20"
			>
				<path
					d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
					stroke="currentColor"
					fill="none"
					fill-rule="evenodd"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</svg>
			搜索
			<i :class="$style.ctrl">Ctrl K</i>
		</button>
	</div>
</template>

<script setup lang="ts">
	//
</script>

<style lang="scss" module>
	.btn {
		color: var(--vuedemo-on-surface);
		font-size: 13px;
		font-weight: 500;

		transition: color 0.25s;

		height: 100%;
		background: none;
		padding: 0 8px;

		display: flex;
		align-items: center;
		gap: 10px;

		& svg {
			width: 15px;
			height: 15px;
		}

		& i {
			font-size: 12px;
			line-height: 20px;
			font-style: normal;
			padding: 0 6px;
			border: 1px solid rgba(54, 58, 60, 0.38);
			border-radius: 4px;
		}

		&:hover {
			color: var(--vuedemo-on-background);

			& i {
				color: var(--vuedemo-primary);
				border-color: var(--vuedemo-primary);
			}
		}
	}
</style>
