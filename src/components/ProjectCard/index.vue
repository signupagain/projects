<template>
	<li class="mb-5">
		<v-card tag="article" class="pa-5" :class="$style.card">
			<hgroup>
				<v-menu location="bottom center" open-delay="300" open-on-hover>
					<template #activator="{ props }">
						<v-card-title tag="h2" v-bind="props">
							<template v-if="to.routeName">
								<a
									href="/"
									@click.prevent="$router.push(to.routeName)"
									v-text="title"
								></a>
							</template>
							<template v-else>
								<a
									:href="to.link"
									:target="to.linkTarget"
									rel="noopener noreferrer"
								>
									{{ title }}
									<v-icon
										icon="fas fa-arrow-up-right-from-square"
										style="font-size: 0.8em"
									></v-icon>
								</a>
							</template>
						</v-card-title>
					</template>
					<template v-if="content.type === 'youtube'">
						<v-tooltip location="bottom center">
							<template #activator="{ props }">
								<div
									:class="$style.yt"
									v-bind="props"
									v-html="content.html"
								></div>
							</template>
							<div class="text-md-h5">
								<p>滑鼠移出畫面即會關閉，保持不動可以看到完整畫面。</p>
								<p>也可以到YouTube上進行觀看，心得可以在影片說明看到。</p>
							</div>
						</v-tooltip>
					</template>
					<template v-else>
						<!-- eslint-disable-next-line vue/no-v-html -->
						<div :class="$style.str" v-html="content.html"></div>
					</template>
				</v-menu>
				<v-card-subtitle tag="p" class="d-flex align-center ga-2">
					{{ subtitle }}
					<a
						v-if="github"
						:href="github"
						target="_blank"
						rel="noopener noreferrer"
					>
						<v-icon
							icon="fab fa-github"
							style="font-size: 1em; vertical-align: 0.5px"
						></v-icon>
					</a>
				</v-card-subtitle>
			</hgroup>
			<v-card-text class="overflow-hidden flex-1-1-0 align-center">
				<p v-if="details.reference">
					<span class="d-block">學習來源:</span>
					<a :href="details.href" target="_blank">
						{{ details.reference }}
						<v-icon icon="" size="x-small"></v-icon>
					</a>
				</p>
				<swiper-container v-else-if="details.skills" ref="skillUl" init="false">
					<swiper-slide
						v-for="{ logo, description, maxWidth } of details.skills"
						:key="logo"
					>
						<v-tooltip location="bottom center" :disabled="!description">
							<template #activator="{ props }">
								<v-img
									class="ma-auto"
									:src="logo"
									height="2rem"
									v-bind="props"
								></v-img>
							</template>
							<template #default>
								<div :style="{ 'max-width': `${maxWidth}px` }">
									<template v-if="typeof description === 'string'">
										<p v-text="description"></p>
									</template>
									<template v-else>
										<section>
											<p
												v-for="word of description"
												:key="word"
												v-text="word"
											></p>
										</section>
									</template>
								</div>
							</template>
						</v-tooltip>
					</swiper-slide>
				</swiper-container>
			</v-card-text>
		</v-card>
	</li>
</template>

<script lang="ts" setup>
	import type { SwiperContainer } from 'swiper/element'
	import useSkillsCarousell from './useSkillsCarousell'
	import type { DataStructure } from '@/@types/projectDetails'

	defineProps<DataStructure>()

	useSkillsCarousell(useTemplateRef<SwiperContainer>('skillUl'))
</script>

<style lang="scss" module>
	.card {
		display: flex;

		@media (600px <= width <= 700px), (max-width: 400px) {
			display: block;
		}
	}

	.yt iframe {
		width: 100%;
		aspect-ratio: 16 / 9;
	}

	.str {
		background: rgb(var(--v-theme-surface-variant));
		padding: 1rem 1.5rem;
		color: rgb(var(--v-theme-on-surface-variant));
		border-radius: 4px;
	}
</style>
