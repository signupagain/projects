<template>
	<ul :class="$style.ul">
		<li :class="[$style.li, $style.red]"></li>
		<li :class="[$style.li, $style.orange]"></li>
		<li :class="[$style.li, $style.yellow]"></li>
		<li :class="[$style.li, $style.green]"></li>
		<li :class="[$style.li, $style.blue]"></li>
		<li :class="[$style.li, $style.indigo]"></li>
		<li :class="[$style.li, $style.violet]"></li>
	</ul>
</template>

<script setup lang="ts">
	definePage({
		meta: {
			title: 'Colorful Bar',
		},
	})
</script>

<style lang="scss" module>
	.ul {
		background: #eee;
		height: 100dvh;
		list-style: none;
		padding: 1.5em;

		perspective: 2000px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		@media (max-width: 400px) {
			flex-flow: column;
		}
	}

	.li {
		background: currentColor;
		width: 10dvw;
		height: 30%;
		box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

		transition:
			width 1s 1s,
			height 1s 1s,
			transform 1s 1s;

		&:hover {
			transform: translateZ(250px);
		}

		&:hover + & {
			transform: translateZ(150px) rotateY(40deg);

			@media (max-width: 400px) {
				transform: translateZ(150px) rotateX(-40deg);
			}
		}

		&:hover + & + & {
			transform: translateZ(100px) rotateY(30deg);

			@media (max-width: 400px) {
				transform: translateZ(150px) rotateX(-30deg);
			}
		}

		&:has(+ &:hover) {
			transform: translateZ(200px) rotateY(-40deg);

			@media (max-width: 400px) {
				transform: translateZ(150px) rotateX(40deg);
			}
		}

		&:has(+ & + &:hover) {
			transform: translateZ(100px) rotateY(-30deg);

			@media (max-width: 400px) {
				transform: translateZ(150px) rotateX(30deg);
			}
		}

		@media (max-width: 400px) {
			width: 30%;
			height: 10dvh;
		}
	}

	.red {
		color: hsl(0, 100%, 45%);
	}
	.orange {
		color: hsl(30, 100%, 45%);
	}
	.yellow {
		color: hsl(60, 100%, 46%);
	}
	.green {
		color: hsl(120, 100%, 45%);
	}
	.blue {
		color: hsl(240, 100%, 45%);
	}
	.indigo {
		color: hsl(275, 100%, 25%);
	}
	.violet {
		color: hsl(273, 100%, 45%);
	}
</style>
