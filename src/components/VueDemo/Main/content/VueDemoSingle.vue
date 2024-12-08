<template>
	<VueDemoBlock :id title="单文件组件">
		<p>
			在大多数启用了构建工具的 Vue 项目中，我们可以使用一种类似 HTML
			格式的文件来书写 Vue 组件，它被称为单文件组件 (也被称为
			<code>*.vue</code>
			文件，英文 Single-File Components，缩写为 SFC)。顾名思义，Vue
			的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS)
			封装在同一个文件里。下面我们将用单文件组件的格式重写上面的计数器示例：
		</p>
		<VueDemoCode theme="vue" :code="vueDemoSingleCode" />
		<p>
			单文件组件是 Vue
			的标志性功能。如果你的用例需要进行构建，我们推荐用它来编写 Vue
			组件。你可以在后续相关章节里了解更多关于
			<a href="/" @click.prevent>单文件组件的用法及用途</a>
			。但你暂时只需要知道 Vue 会帮忙处理所有这些构建工具的配置就好。
		</p>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()
</script>

<style lang="scss" module>
	//
</style>
