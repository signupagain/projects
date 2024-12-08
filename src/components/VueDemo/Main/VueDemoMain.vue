<template>
	<main :class="$style.wrap">
		<VueDemoIntro id="introduction" />
		<VueDemoVue id="what-is-vue" />
		<VueDemoProgressive id="the-progressive-framework" />
		<VueDemoSingle id="single-file-components" />
		<VueDemoStyle id="api-styles" />
		<VueDemoQA id="still-got-questions" />
		<VueDemoPath id="pick-your-learning-path" />
		<p :class="$style.edit">
			<v-icon icon="fas fa-pen-to-square" size="small"></v-icon>
			在 GitHub 上编辑此页
		</p>
		<div
			aria-hidden="true"
			:class="$style.detect"
			:style="{ '--top': `${offset}px` }"
		></div>
	</main>
</template>

<script setup lang="ts">
	const offset = 160
	const store = useAppStore()

	store.$subscribe((_, state) => {
		if (state.isTransitionEnd) {
			vueDemoPosition.curPosition = offset + scrollY
		}
	})

	useEvent(
		document,
		'scroll',
		throttle(() => {
			vueDemoPosition.curPosition = offset + scrollY
		}, 1300)
	)
</script>

<style lang="scss" module>
	.wrap {
		:where(& :is(h1, h2, h3)) {
			position: relative;
			font-weight: 600;
			outline-color: var(--vuedemo-primary);

			& span[id] {
				padding-top: 150px;
			}
		}

		:where(& :is(p, li, section)) {
			margin: 1.2em 0;
		}

		& ::marker {
			color: var(--vuedemo-on-surface);
		}

		:where(& a) {
			color: var(--vuedemo-primary);
			font-weight: 600;
		}

		:where(& a:hover) {
			color: #42d392;
		}

		& code {
			color: #aac8e4;
			font-size: 14px;
			padding: 0.15em 0.5em;
			border-radius: 4px;
			background: var(--vuedemo-surface);
		}
	}

	.edit {
		display: flex;
		align-items: center;
		gap: 8px;

		color: var(--vuedemo-primary);
		font-size: 14px;
		font-weight: 600;
	}

	.detect {
		position: fixed;
		top: var(--top);
		width: 10px;
		background-color: #42d392;
		z-index: -1;
	}
</style>
