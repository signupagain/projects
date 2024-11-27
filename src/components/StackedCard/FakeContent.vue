<template>
	<article :class="$style.card">
		<h1 :class="$style.title">Lorem Ipsum</h1>
		<p :class="$style.content" v-text="content"></p>
		<button :class="$style.btn" type="button" v-text="word"></button>
	</article>
</template>

<script setup lang="ts">
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 5,
		},
	})

	const word = lorem.generateWords(2)
	const content = lorem.generateParagraphs(1)
</script>

<style lang="scss" module>
	.card {
		color: #c7c7c7c9;
		user-select: none;

		display: flex;
		flex-flow: column;
		gap: 26px;
		align-items: start;

		& :first-child {
			margin: 0 0 10px;
		}

		@media (max-width: 1100px) {
			align-items: center;
			text-align: center;
		}
	}

	.title {
		-webkit-text-fill-color: transparent;
		background-clip: text !important;
		-webkit-background-clip: text !important;
		background: linear-gradient(0deg, #f76591, #ffc16f);

		font-family: 'Dancing Script', cursive;
		font-optical-sizing: auto;
		font-weight: 700;
		font-style: normal;
		font-size: clamp(2.5rem, 4.2vw, 9rem);
	}

	.content {
		font-size: clamp(0.9rem, 4vw, 1.5rem);
		line-height: 1.6;

		max-height: calc(6 * 1.6 * 1em);
		text-overflow: ellipsis;
		overflow: hidden;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 6;
		-webkit-line-clamp: 6;
	}

	.btn {
		-webkit-text-fill-color: #fff;
		padding: 8px 16px;
		background: linear-gradient(-180deg, #ffc16f, #f76591);
		border: none;
		border-radius: 6px;
		touch-action: manipulation;

		transition:
			transform 0.2s ease-in,
			box-shadow 0.2s ease-in;
		transform: scale(1);
		box-shadow: 0;

		&:hover {
			transform: scale(0.98);
			box-shadow: 0 4px 10px rgba(247, 101, 145, 0.5);
		}
	}
</style>
