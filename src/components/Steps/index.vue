<template>
	<ol :class="[$style.ol, { back: activeIndexSteps < 0 }]">
		<template v-for="(step, index) of steps" :key="step">
			<li
				:class="[
					$style.li,
					{ active: index === activeIndex },
					{ checked: index <= activeIndex },
				]"
			>
				<span :class="$style.circle" v-text="index + 1"></span>
				<p :class="$style.crumb">
					{{ step }}
				</p>
			</li>
			<div v-if="index !== steps.length - 1" :class="$style.bar"></div>
		</template>
	</ol>
</template>

<script setup lang="ts">
	const steps = defineModel<string[]>('steps', {
		required: true,
		type: Array,
		validator: value => Array.isArray(value) && value.length > 0,
	})

	const activeIndexSteps = defineModel<number>('activeIndexSteps', {
		default: 0,
		type: Number,
	})

	const activeIndex = ref(0)

	watch(activeIndex, v =>
		v >= steps.value.length ? (v = steps.value.length - 1)
		: v < 0 ? (v = 0)
		: null
	)

	const token = ref<number | null>(null)

	watch(
		activeIndexSteps,
		v => {
			if (v === 0) return
			if (!token.value)
				token.value = useSteps(steps, activeIndex, activeIndexSteps, token, 500)
		},
		{ immediate: true }
	)
</script>

<style lang="scss" module>
	$size: 2em;

	.ol {
		font-size: calc($size / 2);
		font-weight: 500;
		color: #2e3138;
		background: currentColor;
		list-style: none;
		padding: 1em 3em 2.5em;
		border-radius: 0.75em;

		display: flex;
		align-items: center;

		@media (max-width: 500px) {
			height: 300px;
			flex-flow: column;
			padding: 1em;

			& li,
			& div {
				margin-left: -30%;
			}
		}

		@media (max-width: 330px) {
			& li,
			& div {
				margin-left: -50%;
			}
		}
	}

	.circle {
		display: inline-block;
		width: $size;
		height: $size;
		line-height: $size;
		text-align: center;
		border-radius: 50%;

		background-color: #5c6270;
		transition:
			background-color 0.5s 0.3s,
			box-shadow 0.5s 0.5s;

		:global(.back) & {
			transition:
				background-color 0.5s,
				box-shadow 0.5s 0.3s;
		}

		:global(.checked) & {
			background-color: #6e95f7;
		}

		:global(.active) & {
			box-shadow: 0 0 0 0.2em hsla(223, 90%, 75%, 0.4);
		}
	}

	.crumb {
		position: absolute;
		margin-top: 0.5em;
		text-indent: calc(-50% + $size);
		font-weight: 300;

		transition:
			font-weight 0.5s 0.5s,
			color 0.5s 0.5s;

		:global(.back) & {
			transition:
				font-weight 0.5s,
				color 0.5s;
		}

		color: #737a8c;
		:global(.checked) & {
			color: #e3e4e8;
			font-weight: 700;
		}

		@media (max-width: 500px) {
			display: inline;
			margin-top: calc($size / 4 - 0.2em);
			margin-left: 15%;
		}
	}

	.bar {
		flex: 1;
		height: 3px;
		background: #5c6270;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			height: inherit;
			background: rgb(110, 149, 247);
			transform: translate(-100%);
			transition: transform 0.5s;

			:global(.back) & {
				transition: transform 0.5s 0.5s;
			}

			@media (max-width: 500px) {
				width: inherit;
				height: 100%;
				transform: translateY(-100%);
			}
		}

		:global(.checked):has(+ & + :global(.checked)) + &::after {
			transform: translate(0);
		}

		@media (max-width: 500px) {
			width: 3px;
		}
	}
</style>
