<template>
	<VueDemoBlock :id title="还有其他问题？">
		<p>
			请查看我们的
			<a href="/" @click.prevent>FAQ</a>
			。
		</p>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()
</script>

<style lang="scss" module>
	//
</style>
