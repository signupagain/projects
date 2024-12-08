<template>
	<VueDemoBlock :id title="什么是 Vue？">
		<p>
			Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript
			框架。它基于标准 HTML、CSS 和 JavaScript
			构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue
			都可以胜任。
		</p>
		<p>下面是一个最基本的示例：</p>
		<VueDemoCode :code="js" theme="js" />
		<VueDemoCode :code="template" theme="template" />
		<p><strong>结果展示</strong></p>
		<div :class="$style.demo">
			<button type="button" @click="count++">Count is: {{ count }}</button>
		</div>
		<p>上面的示例展示了 Vue 的两个核心功能：</p>
		<ul style="padding-left: 20px">
			<li>
				<strong>声明式渲染</strong>
				：Vue 基于标准 HTML
				拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和
				JavaScript 状态之间的关系。
			</li>
			<li>
				<strong>响应性</strong>
				：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。
			</li>
		</ul>
		<p>
			你可能已经有了些疑问——先别急，在后续的文档中我们会详细介绍每一个细节。现在，请继续看下去，以确保你对
			Vue 作为一个框架到底提供了什么有一个宏观的了解。
		</p>
		<section :class="$style.note">
			<h3>
				<v-icon
					color="#42b883"
					icon="fas fa-circle-info"
					size="x-small"
				></v-icon>
				预备知识
			</h3>
			<p>
				文档接下来的内容会假设你对 HTML、CSS 和 JavaScript
				已经基本熟悉。如果你对前端开发完全陌生，最好不要直接从一个框架开始进行入门学习——最好是掌握了基础知识再回到这里。如有需要，你可以通过这些
				<a href="/" target="_blank" rel="noopener noreferrer" @click.prevent>
					JavaScript
				</a>
				、
				<a href="/" target="_blank" rel="noopener noreferrer" @click.prevent>
					HTML
				</a>
				和
				<a href="/" target="_blank" rel="noopener noreferrer" @click.prevent>
					CSS
				</a>
				概述来检验你的知识水平。如果之前有其他框架的经验会很有帮助，但也不是必须的。
			</p>
		</section>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()

	const js = `import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')`

	const template = `<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>`

	const count = ref(0)
</script>

<style lang="scss" module>
	.demo {
		padding: 22px 24px;
		margin: 1.2em 0;
		border-radius: 8px;
		background: var(--vuedemo-surface);

		button {
			font-size: 0.9em;
			font-weight: 600;
			background: #2f2f2f;
			padding: 5px 12px;
			border: 1px solid rgba(84, 84, 84, 0.65);
			border-radius: 8px;
		}
	}

	.note {
		line-height: 1.6;
		margin: 28px 0;
		padding: 20px 24px 20px 42px;
		border: 1px solid var(--vuedemo-primary);
		border-radius: 8px;

		h3 {
			font-size: 15px;
			margin-left: -25px;

			display: flex;
			align-items: center;
			gap: 10px;
		}

		p {
			color: var(--vuedemo-on-surface);
			font-weight: 600;
			font-size: 14px;
			margin: 8px 0 0;
		}
	}
</style>
