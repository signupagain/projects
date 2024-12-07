<template>
	<v-app style="background: transparent">
		<router-view v-slot="{ Component, route }">
			<transition
				mode="out-in"
				:name="route.meta.transition ?? 'xMoveIn'"
				@before-enter="recordTransitionStatus(false)"
				@after-enter="recordTransitionStatus(true)"
			>
				<component :is="Component"></component>
			</transition>
		</router-view>
		<div class="position-absolute" style="z-index: -1">
			<vue-particles id="tsparticles" :options />
		</div>
	</v-app>
</template>

<script lang="ts" setup>
	const options = {
		particles: {
			number: {
				value: 100,
			},
			color: {
				value: '#ffffff',
			},
			links: {
				enable: true,
				distance: 200,
			},
			shape: {
				type: 'circle',
			},
			opacity: {
				value: 1,
			},
			size: {
				value: {
					min: 4,
					max: 6,
				},
			},
			move: {
				enable: true,
				speed: 2,
			},
		},
		background: {
			color: '#000000',
		},
		poisson: {
			enable: true,
		},
	}

	const recordTransitionStatus = (bool: boolean) => {
		const store = useAppStore()

		store.$patch({
			isTransitionEnd: bool,
		})

		if (bool) scroll({ top: 0, left: 0 })
	}
</script>
