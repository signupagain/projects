<template>
	<article :class="$style.wrap">
		<VueDemoMain style="flex: 1" />
		<VueDemoAside style="width: 223px" />
	</article>
</template>

<script setup lang="ts">
	definePage({
		meta: {
			layout: 'vue-demo',
			title: '簡介 | Vue.js',
			color: {
				vueDemo: {
					background: '#1a1a1a',
					surface: '#242424',
					primary: '#42b883',
					'primary-dark1': '#75c05e',
					'primary-dark2': '#5a9f45',
					secondary: '#647eff',
					accent: '#aac8e4',
					'on-background': '#FFFFFFDE',
					'on-surface': '#EBEBEB99',
				},
			},
		},
	})

	const vueDemo = useRoute('/vue-demo/').meta.color?.vueDemo

	assertIsDefined('vueDemo', vueDemo)
	Object.keys(vueDemo).forEach(key => {
		assertIsKeyof(vueDemo, key)
		document.documentElement.style.setProperty(`--vuedemo-${key}`, vueDemo[key])
	})

	onUnmounted(() => {
		if (!vueDemo) throw new Error('vueDemo is not defined.')

		setTimeout(() => {
			Object.keys(vueDemo).forEach(key => {
				assertIsKeyof(vueDemo, key)
				document.documentElement.style.removeProperty(`--vuedemo-${key}`)
			})
		}, 2000)
	})
</script>

<style lang="scss" module>
	.wrap {
		margin: 64px 96px 96px 64px;
		display: flex;
		align-items: start;
		gap: 64px;

		@media (max-width: 960px) {
			max-width: 690px;
			padding: 0 32px;
			margin: 64px auto 96px;
		}
	}
</style>
