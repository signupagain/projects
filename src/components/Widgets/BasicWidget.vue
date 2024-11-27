<template>
	<v-speed-dial location="top center" transition="scale-transition">
		<template #activator="{ props: activatorProps }">
			<v-fab
				:class="$style.wrap"
				:style="{ zIndex }"
				v-bind="activatorProps"
				size="default"
				icon="$menu"
				:color="bgColor"
			></v-fab>
		</template>

		<v-btn
			v-for="{ key, icon, event, color } of btnsList"
			:key
			:icon
			:color
			@click="event"
		></v-btn>
	</v-speed-dial>
</template>

<script setup lang="ts">
	interface IBtn {
		icon: string
		event: () => void
		color?: string
		[key: string]: string | (() => void) | undefined
	}

	const {
		bgColor,
		btns,
		inset = 'auto 6rem 5rem auto',
	} = defineProps<{
		bgColor?: string
		btns?: IBtn[]
		zIndex?: number
		inset?: string
	}>()

	const router = useRouter()
	const basicBtnsList = [
		{ icon: '$close', event: () => router.push('/'), color: bgColor },
	]
	const btnsList = (btns ? [...basicBtnsList, ...btns] : basicBtnsList).map(
		(obj, key) =>
			obj.hasOwnProperty('color') ?
				Object.assign(obj, { key })
			:	Object.assign(obj, { key, color: bgColor })
	)
</script>

<style lang="scss" module>
	.wrap {
		position: fixed !important;
		inset: v-bind(inset);
	}
</style>
