<template>
	<div :class="$style.wrap">
		<div
			class="mx-auto pt-15 px-sm-10 px-5 w-lg-75 d-sm-flex flex-sm-row-reverse ga-10 align-start"
		>
			<v-main class="overflow-hidden" style="flex: 70%">
				<router-view />
			</v-main>
			<router-view name="MyIntro" :class="$style.intro" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	//
</script>

<style lang="scss" module>
	.wrap {
		min-height: 100dvh;
		background: rgb(var(--v-theme-background));
	}

	.intro {
		flex: 260px;

		@media (max-width: 600px) {
			margin-top: 40px;
		}
	}
</style>
