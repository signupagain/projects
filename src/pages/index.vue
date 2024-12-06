<template>
	<article>
		<hgroup class="mb-5 border-b-md border-primary border-opacity-50">
			<h1 class="text-h3">作品列表</h1>
			<p class="mt-2">懸浮在LOGO上可以看使用心得。</p>
			<p>點擊或懸浮於作品標題能快速瞭解作品。</p>
		</hgroup>
		<ul style="list-style: none">
			<project-card
				v-for="(detail, index) of projectDetails"
				:key="index"
				v-bind="detail"
			/>
		</ul>
	</article>
</template>

<script lang="ts" setup>
	definePage({
		meta: {
			layout: 'home',
			title: '阿彥的作品列表',
		},
	})
</script>
