<script setup lang="ts">
	defineProps<{
		title: string
		description: string
		/**
		 * Use [simple-icons](https://icones.js.org/collection/simple-icons) set for icon.
		 */
		hero: Array<{
			'aria-label': string
			icon: string // icons from simple-icons
			color: string
		}>
	}>()

	const { avatar, links } = useAppConfig()

	const initial = {
		scale: 1.1,
		opacity: 0,
		filter: 'blur(20px)',
	}

	const animate = {
		scale: 1,
		opacity: 1,
		filter: 'blur(0px)',
	}

	const transition = {
		duration: 0.6,
		delay: 0.1,
	}
</script>

<template>
	<UPageHero
		:ui="{
			headline: 'flex items-center justify-center',
			title: 'text-shadow-md max-w-lg mx-auto',
		}"
	>
		<template #headline>
			<Motion :initial :animate :transition>
				<UColorModeAvatar
					class="ring-default ring-offset-bg size-18 ring ring-offset-3"
					v-bind="avatar"
				/>
			</Motion>
		</template>

		<template #title>
			<Motion as="span" :initial :animate :transition>
				{{ title }}
			</Motion>
		</template>

		<template #description>
			<Motion :initial :animate :transition="{ ...transition, delay: 0.3 }">
				{{ description }}
			</Motion>
		</template>

		<template #links>
			<div class="flex gap-4">
				<Motion
					v-for="(link, index) of links"
					:key="link.to"
					:initial
					:animate
					:transition="{ ...transition, delay: 0.5 + index * 0.1 }"
				>
					<UButton size="md" color="neutral" variant="ghost" v-bind="link" />
				</Motion>
			</div>
		</template>

		<UMarquee
			pause-on-hover
			class="-mx-8 py-2 [--duration:40s] sm:-mx-12 lg:-mx-16"
		>
			<Motion
				v-for="(item, index) of hero"
				:key="item['aria-label']"
				:initial
				:animate
				:transition="{ ...transition, delay: 0.5 + index * 0.1 }"
			>
				<div
					role="img"
					:aria-label="item['aria-label']"
					class="flex size-58.5 items-center justify-center rounded-lg text-9xl ring"
					:class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
				>
					<UIcon :name="item.icon" :style="{ color: item.color }" />
				</div>
			</Motion>
		</UMarquee>
	</UPageHero>
</template>

<style lang="scss"></style>
