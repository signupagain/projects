<template>
	<header
		class="position-sticky top-0"
		style="background: var(--vuedemo-background); z-index: 2"
	>
		<div :class="$style.wrap">
			<VueDemoHeaderLogo />
			<div :class="$style.block" style="flex: 1">
				<VueDemoHeaderSearch style="flex: 1" />
				<VueDemoHeaderList />
				<VueDemoHeaderDetails />
			</div>
			<button :class="$style.btn" type="button" style="margin-left: auto">
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
			</button>
			<button :class="$style.btn" type="button">
				<div :class="$style.hamburger">
					<div
						:class="[$style['hamburger-line'], $style['hamburger-line-top']]"
					></div>
					<div
						:class="[$style['hamburger-line'], $style['hamburger-line-center']]"
					></div>
					<div
						:class="[$style['hamburger-line'], $style['hamburger-line-bottom']]"
					></div>
				</div>
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
	definePage({
		meta: {
			layout: 'vue-demo',
		},
	})
</script>

<style lang="scss" module>
	.wrap {
		color: var(--vuedemo-on-background);
		height: 55px;
		padding: 0 32px;
		border-bottom: 1px solid rgba(84, 84, 84, 0.48);
		display: flex;
		justify-content: space-between;

		& ul {
			list-style: none;
		}

		@media (max-width: 830px) {
			padding-right: 12px;
		}
	}

	.block {
		display: flex;

		@media (max-width: 830px) {
			display: none;
		}
	}

	.btn {
		display: grid;
		place-items: center;
		width: 40px;

		& svg {
			width: 18px;
			height: 18px;
		}

		&:hover .hamburger-line {
			&-top {
				transform: translate(4px);
			}

			&-center {
				transform: translate(0);
			}

			&-bottom {
				transform: translate(50%);
			}
		}

		@media (min-width: 830px) {
			display: none;
		}
	}

	.hamburger {
		position: relative;
		width: 16px;
		height: 14px;
		overflow: hidden;
	}

	.hamburger-line {
		position: absolute;
		width: inherit;
		height: 2px;
		background: rgba(255, 255, 255, 0.87);
		transition: transform 0.25s;

		&-center {
			inset: 0;
			margin: auto;
			transform: translate(50%);
		}

		&-bottom {
			bottom: 0;
			transform: translate(4px);
		}
	}
</style>
