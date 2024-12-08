<template>
	<article :class="$style.wrap">
		<component
			:is="tag"
			:class="[{ [$style.h1]: tag === 'h1' }, { [$style.h2]: tag === 'h2' }]"
		>
			<span :id ref="title" v-text="title"></span>
			<a :class="$style.link" :href="`#${id}`"></a>
		</component>
		<slot></slot>
	</article>
</template>

<script setup lang="ts">
	const {
		tag = 'h2',
		title,
		id,
	} = defineProps<{
		tag?: string
		id: string
		title: string
	}>()

	const titleSpan = useTemplateRef('title')
	const store = useAppStore()

	if (tag === 'h2') {
		const isBlockSaved = vueDemoPosition.ids.every(obj => obj.title !== title)
		if (isBlockSaved) vueDemoPosition.ids.push({ title, id, y: 0 })

		store.$subscribe((_, { isTransitionEnd }) => {
			const targetIndex = vueDemoPosition.ids.findIndex(
				obj => obj.title === title && obj.y === 0
			)

			if (!isTransitionEnd || targetIndex === -1) return

			assertIsDefined('titleSpan', titleSpan.value)
			const y = titleSpan.value.getBoundingClientRect().y + scrollY

			vueDemoPosition.ids.splice(targetIndex, 1, { title, id, y })
		})
	}
</script>

<style lang="scss" module>
	.wrap {
		margin: 0 0 4rem;
		color: var(--vuedemo-on-background);

		&:not(:first-child) {
			border-top: solid var(--vuedemo-surface);
		}
	}

	.h1,
	.h2 {
		letter-spacing: -0.02em;
	}

	.h1 {
		margin: 0 0 3rem;
		font-size: 38px;
		line-height: 1.4;
		color: var(--vuedemo-on-background);
		z-index: 1;
	}

	.h2 {
		margin: 28px 0;
		font-size: 28px;
	}

	.link {
		color: var(--vuedemo-primary);
		font-weight: 500;
		position: absolute;
		inset: 0;

		&::after {
			content: '#';
			margin-left: -1em;
			opacity: 0;

			transition: opacity 0.3s;
		}

		&:hover::after {
			opacity: 1;
		}
	}
</style>
