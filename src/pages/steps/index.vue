<template>
	<div :class="$style.wrap">
		<form :class="$style.form">
			<Steps
				v-model:steps="steps"
				v-model:active-index-steps="activeIndexSteps"
				style="grid-area: crumbs"
			/>
			<button type="button" :class="$style.prev" @click="activeIndexSteps--">
				Previous
			</button>
			<button type="button" :class="$style.next" @click="activeIndexSteps++">
				Next
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
	definePage({
		meta: {
			title: 'Steps',
		},
	})

	const steps = ref([
		'About You',
		'About Book',
		'Review',
		'Signing',
		'Contract',
	])

	const activeIndexSteps = ref(2)
</script>

<style lang="scss" module>
	.wrap {
		background: #17181c;
		height: 100dvh;
		padding: 0 1em;

		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.form {
		margin: 3em;
		max-width: 900px;
		width: 100%;

		display: grid;
		grid:
			'crumbs crumbs' 1fr
			'prev next' 3rem
			/ 1fr 1fr;
		gap: 1.5em;
	}

	.prev {
		grid-area: prev;
		margin-left: auto;
	}

	.next {
		grid-area: next;
	}

	.prev,
	.next {
		max-width: 100px;
		height: fit-content;
		padding: 1em;
		border-radius: 0.6em;

		color: #6e95f7;
		background: currentColor;
		-webkit-text-fill-color: #17181c;

		&:hover {
			color: hsl(223, 50%, 60%);
		}
	}
</style>
