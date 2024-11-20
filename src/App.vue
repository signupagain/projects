<template>
	<v-app style="background: #212121">
		<router-view v-slot="{ Component, route }">
			<transition mode="out-in" :name="route.meta.transition ?? 'x-smaller'">
				<component :is="Component"></component>
			</transition>
		</router-view>
	</v-app>
</template>

<script lang="ts" setup>
	//
</script>
