<template>
	<div ref="box" class="position-relative align-self-stretch">
		<figure
			v-for="(
				{ src, photographer, photographerUrl, isActive, key }, index
			) in list"
			:key
			:class="[$style.fig, { active: isActive }]"
			:style="{ cursor }"
			@click="resetAndSwap"
		>
			<img :class="$style.img" :src :alt="`圖片${index + 1}`" />
			<figcaption>
				<a
					style="text-decoration: none; -webkit-text-fill-color: #c7c7c7c9"
					:href="photographerUrl"
					target="_blank"
					rel="noopener noreferrer"
				>
					by {{ photographer }}
					<v-icon
						icon="fas fa-arrow-up-right-from-square"
						style="font-size: 0.7em; vertical-align: 0.5px"
					></v-icon>
				</a>
			</figcaption>
		</figure>
	</div>
</template>

<script setup lang="ts">
	const list = reactive(
		imgs.map(obj => Object.assign(obj, { key: nanoid(4), isActive: false }))
	)
	const state = ref(false)
	const cursor = computed(() => (state.value ? 'progress' : 'pointer'))

	const swap = () => {
		state.value = true
		list[list.length - 1].isActive = true

		setTimeout(() => {
			const img = Object.assign(list.pop()!, {
				key: nanoid(4),
				isActive: false,
			})

			list.splice(0, 0, img)
			state.value = false
		}, 1100)
	}

	const { stop, reset } = useInterval(swap, 4000)
	const resetAndSwap = throttle(() => {
		if (state.value) return

		stop()
		swap()

		setTimeout(reset, 1200)
	}, 500)
</script>

<style lang="scss" module>
	$offset: 40px;
	$scaleOffset: 0.05;

	.fig {
		position: absolute;
		inset: 0;
		margin: auto;
		z-index: 2;

		text-align: center;

		& figcaption {
			margin-top: 1.5rem;
			visibility: hidden;
		}

		@for $i from 1 through 5 {
			&:nth-last-child(#{$i}) {
				& .img {
					transform: scale(1 - $scaleOffset * ($i - 1))
						translate(calc($offset * ($i - 1)));

					@if ($i == 1) {
						box-shadow: 0 1px 5px 5px rgba(255, 193, 111, 0.5);
					}
				}

				& figcaption {
					@if ($i == 1) {
						visibility: visible;
					}
				}
			}
		}

		&:global(.active) {
			animation: swap 1.2s ease-out forwards;

			& figcaption {
				visibility: hidden;
			}
		}

		width: 265px;
		height: 380px;

		@media (max-width: 530px) {
			width: calc(265px / 4 * 3);
			height: calc(380px / 4 * 3);
		}
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 2rem;

		transition:
			box-shadow 0.2s,
			transform 0.2s;

		box-shadow: 0;
		transform: scale(0.8) translate($offset * 4);
	}

	@keyframes swap {
		30% {
			transform: translate(-200px) scale(0.8) rotate(-5deg) rotateY(65deg);
		}
		100% {
			transform: translate(0px) scale(0.5);
			z-index: 1;
		}
	}
</style>
