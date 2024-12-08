<template>
	<VueDemoBlock :id title="渐进式框架">
		<p>
			Vue 是一個框架，也是一個生態。 其功能覆蓋了大部分前端開發常見的需求。 但
			Web 世界是十分多樣化的，不同的開發者在 Web
			上構建的東西可能在形式和規模上會有很大的不同。 考慮到這一點，Vue
			的設計非常注重靈活性和“可以被逐步集成”這個特點。
			根據你的需求場景，你可以用不同的方式使用 Vue
		</p>
		<ul :class="$style.ul">
			<li>无需构建步骤，渐进式增强静态的 HTML</li>
			<li>在任何页面中作为 Web Components 嵌入</li>
			<li>单页应用 (SPA)</li>
			<li>全栈 / 服务端渲染 (SSR)</li>
			<li>Jamstack / 静态站点生成 (SSG)</li>
			<li>开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</li>
		</ul>
		<p>
			如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的
			HTML 和 JavaScript 知识。即使你不是这些方面的专家，也能够跟得上。
		</p>
		<p>
			如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入
			Vue，或者是对上述的这些概念感到好奇，我们在
			<a href="/">使用 Vue 的多种方式</a>
			中讨论了有关它们的更多细节。
		</p>
		<p>
			无论再怎么灵活，Vue
			的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用
			Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将
			Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。
		</p>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()
</script>

<style lang="scss" module>
	.ul {
		padding-left: 1.25rem;

		li {
			margin: 0;
		}
	}
</style>
