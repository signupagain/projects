<template>
	<div :class="$style.wrap">
		<section>
			<h2 :class="$style.title">本页目录</h2>
			<ul class="position-relative" style="list-style: none">
				<li
					v-for="{ title, id } of vueDemoPosition.ids"
					:key="title"
					:class="$style.li"
				>
					<a :href="`#${id}`" v-text="title"></a>
				</li>
				<div
					:class="[$style.box, { active: offsetMutiplier !== 0 }]"
					:style="{ '--mutiplier': offsetMutiplier }"
				></div>
			</ul>
		</section>
		<a
			:class="$style['conf-wrap']"
			href="/"
			target="_blank"
			rel="noopener noreferrer"
			@click.prevent
		>
			<img :class="$style['conf-img']" :src="Viteconf" alt="viteconf" />
			<section :class="$style.conf">
				<h2 :class="$style['conf-title']">ViteConf 24 - Oct 3</h2>
				<p style="order: -1">Building Together</p>
				<p>Get your free ticket!</p>
			</section>
		</a>
		<a :class="$style.sponsor" href="/" @click.prevent>成为赞助商</a>
		<div
			class="mt-5"
			style="padding: 1px 15px 10px; background: var(--vuedemo-surface)"
		></div>
	</div>
</template>

<script setup lang="ts">
	import Viteconf from '@/assets/logos/Viteconf.svg'

	const offsetMutiplier = ref(0)

	watch(
		() => vueDemoPosition.curPosition,
		pos => {
			const arr = vueDemoPosition.ids.sort((a, b) => a.y - b.y)

			let tmp = 0

			arr.forEach(({ y }) => {
				if (pos < y) return

				tmp++
			})

			offsetMutiplier.value = tmp
		}
	)
</script>

<style lang="scss" module>
	.wrap {
		font-size: 11px;

		position: sticky;
		top: 79px;

		@media (max-width: 1280px) {
			display: none;
		}
	}

	.title {
		color: rgba(232, 230, 227, 0.87);
		font-size: inherit;
		font-weight: 700;
		letter-spacing: 0.4px;
		margin: 0 0 4px;
	}

	.li {
		font-size: 13px;
		font-weight: 500;
		line-height: 28px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		color: rgba(235, 235, 235, 0.6);
		transition: color 0.25s;

		&:hover,
		&:global(.active) {
			color: rgba(255, 255, 255, 0.87);
		}

		& a {
			color: inherit;
		}
	}

	.box {
		position: absolute;
		top: -28px + 4px;
		left: -12px;
		width: 4px;
		height: 20px;
		border-radius: 4px;
		background: var(--vuedemo-primary);

		opacity: 0;
		transition:
			opacity 0.4s,
			transform 0.4s;

		&:global(.active) {
			opacity: 1;
			transform: translateY(calc(var(--mutiplier) * 28px));
		}
	}

	.conf-wrap {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;

		border: 2px solid rgba(232, 230, 227, 0.87);
		border-radius: 4px;
		font-weight: 700;
		margin: 1em 0;
		filter: grayscale(1);

		&:hover {
			border-color: #9499ff;
			filter: none;

			.conf p {
				opacity: 1;
			}

			.conf-img {
				transform: scale(1.75);
			}

			.conf-title {
				-webkit-text-fill-color: transparent;
			}
		}
	}

	.conf {
		display: flex;
		flex-flow: column;
		font-size: 0.7rem;
		color: rgba(232, 230, 227, 0.87);
		padding: 0.4rem 0;

		:where(& :is(h2, p)) {
			color: inherit;
		}

		&-title {
			font-size: 0.9rem;
			background-clip: text;
			background-image: linear-gradient(120deg, #b047ff 16%, #9499ff, #9499ff);
		}

		& p {
			font-size: inherit;

			opacity: 0;
			transition: opacity 0.4s;
		}

		&-img {
			width: 22px;
			aspect-ratio: 1 / 1 auto;
			transition: transform 0.4s;
		}
	}

	.sponsor {
		font-size: inherit;
		display: grid;
		place-items: center;
		height: 70px;
		background: var(--vuedemo-surface);
		border-radius: 2px;

		&:hover {
			color: #213547;
			background: #f1f1f1;
		}
	}
</style>
