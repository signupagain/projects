<template>
	<article :class="$style.wrap">
		<div :class="$style.heading">
			<h1 id="title" class="clip">404</h1>
			<div aria-labelledby="title" :class="{ active: isActive }">
				<span :class="[$style.word, $style.word1]">4</span>
				<span :class="$style.render" @animationend="toggle">0</span>
				<span :class="[$style.word, $style.word2]">4</span>
			</div>
		</div>
		<p :class="$style.word1">Woops , Page not found</p>
	</article>
</template>

<script setup lang="ts">
	const isActive = ref(false)
	const toggleTracker = reactive(new Set<'a' | 'b'>())

	watch(toggleTracker, v => {
		if (v.size !== 2 && v.size !== 0) return
		isActive.value = v.size === 2
	})

	const toggle = (e: AnimationEvent) =>
		e.pseudoElement === '::after' ?
			toggleTracker.has('a') ?
				toggleTracker.delete('a')
			:	toggleTracker.add('a')
		: toggleTracker.has('b') ? toggleTracker.delete('b')
		: toggleTracker.add('b')
</script>

<style lang="scss" module>
	@use '@/styles/main';

	$c1: rgb(255, 196, 140);
	$c2: rgb(239, 250, 180);
	$c3: rgb(209, 242, 165);
	$c4: rgb(245, 105, 145);
	$ca1: rgba(255, 196, 140, 0.4);
	$ca2: rgba(239, 250, 180, 0.4);
	$ca3: rgba(209, 242, 165, 0.4);
	$ca4: rgba(245, 105, 145, 0.4);

	.wrap {
		height: 100dvh;
		background: #416475;
		overflow: hidden;

		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		gap: 50px;
	}

	.heading {
		position: relative;
		display: grid;
		place-items: center;

		font-size: 180px;
		font-weight: 800;
		font-family: 'Catamaran', sans-serif;
		letter-spacing: 1px;

		@media (max-width: 360px) {
			font-size: 100px;
		}
	}

	.word {
		grid-area: 1 / 1;

		:global(.active) & {
			animation: none;
		}
	}

	.word1 {
		color: $c3;
		animation: colordancing1 4s infinite;
	}

	.word2 {
		color: $c1;
		animation: colordancing2 4s infinite;
	}

	@keyframes colordancing1 {
		0%,
		100% {
			color: $c3;
		}
		25% {
			color: $c4;
		}
		50% {
			color: $c1;
		}
		75% {
			color: $c2;
		}
	}

	@keyframes colordancing2 {
		0%,
		100% {
			color: $c1;
		}
		25% {
			color: $c2;
		}
		50% {
			color: $c3;
		}
		75% {
			color: $c4;
		}
	}

	.render {
		--size: 120px;
		--shadowSize: 30px;
		--shadowSizeInvert: -30px;

		display: inline-block;
		vertical-align: middle;
		position: relative;
		color: transparent;
		width: var(--size);
		height: var(--size);

		&::before,
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 50%;
			box-shadow:
				inset var(--shadowSize) 0 0 $ca3,
				inset 0 var(--shadowSize) 0 $ca2,
				inset var(--shadowSizeInvert) 0 0 $ca1,
				inset 0 var(--shadowSizeInvert) 0 $ca4;
			animation: shadowsdancing 4s;
		}

		&::after {
			transform: rotate(45deg);
		}

		:global(.active) &::before {
			animation: spin360 1s;
		}

		:global(.active) &::after {
			animation: spin360-add45 1s;
		}

		@media (max-width: 360px) {
			--size: 66.6667px;
			--shadowSize: 20px;
			--shadowSizeInvert: -20px;
		}
	}

	@keyframes shadowsdancing {
		0%,
		100% {
			box-shadow:
				inset var(--shadowSize) 0 0 $ca3,
				inset 0 var(--shadowSize) 0 $ca2,
				inset var(--shadowSizeInvert) 0 0 $ca1,
				inset 0 var(--shadowSizeInvert) 0 $ca4;
		}
		25% {
			box-shadow:
				inset var(--shadowSize) 0 0 $ca4,
				inset 0 var(--shadowSize) 0 $ca3,
				inset var(--shadowSizeInvert) 0 0 $ca2,
				inset 0 var(--shadowSizeInvert) 0 $ca1;
		}
		50% {
			box-shadow:
				inset var(--shadowSize) 0 0 $ca1,
				inset 0 var(--shadowSize) 0 $ca4,
				inset var(--shadowSizeInvert) 0 0 $ca3,
				inset 0 var(--shadowSizeInvert) 0 $ca2;
		}
		75% {
			box-shadow:
				inset var(--shadowSize) 0 0 $ca2,
				inset 0 var(--shadowSize) 0 $ca1,
				inset var(--shadowSizeInvert) 0 0 $ca4,
				inset 0 var(--shadowSizeInvert) 0 $ca3;
		}
	}
</style>
