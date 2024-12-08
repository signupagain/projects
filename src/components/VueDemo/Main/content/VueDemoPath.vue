<template>
	<VueDemoBlock :id title="选择你的学习路径">
		<p>
			不同的开发者有不同的学习方式。尽管在可能的情况下，我们推荐你通读所有内容，但你还是可以自由地选择一种自己喜欢的学习路径！
		</p>
		<div :class="$style['path-wrap']">
			<a
				v-for="({ title, subtitle }, key) of paths"
				:key
				href="/"
				:class="$style.path"
				@click.prevent
			>
				<section class="ma-0">
					<h3 v-text="title"></h3>
					<p class="ma-0" style="font-size: 14px" v-text="subtitle"></p>
				</section>
			</a>
		</div>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()

	const paths = [
		{ title: '尝试互动教程', subtitle: '适合喜欢边动手边学的读者。' },
		{
			title: '继续阅读该指南',
			subtitle: '该指南会带你深入了解框架所有方面的细节。',
		},
		{ title: '查看示例', subtitle: '浏览核心功能和常见用户界面的示例。' },
	]
</script>

<style lang="scss" module>
	.path-wrap {
		display: flex;
		justify-content: space-between;
		gap: 12px;

		@media (max-width: 1110px) {
			flex-flow: column;
		}
	}

	.path {
		color: var(--vuedemo-on-surface);
		padding: 28px 36px;
		border-radius: 8px;
		background: #242424;
		border: 1px solid #242424;
		transition: border-color 0.4s;
		flex: 1;

		&:hover {
			border-color: var(--vuedemo-primary);
		}

		& h3 {
			font-size: 20px;
			line-height: 1.4;
			color: var(--vuedemo-primary);
			margin: 0 0 15px;
		}
	}
</style>
