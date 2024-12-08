<template>
	<VueDemoBlock id="api-styles" title="API 风格">
		<p>
			Vue 的组件可以按两种不同的风格书写：
			<strong>选项式 API</strong>
			和
			<strong>组合式 API</strong>
			。
		</p>
		<h3 class="mt-12 mb-5">
			<span id="options-api">选项式 API (Options API)</span>
			<a href="/" :class="$style.link" @click.prevent></a>
		</h3>
		<p>
			使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如
			<code>data</code>
			、
			<code>methods</code>
			和
			<code>mounted</code>
			。选项所定义的属性都会暴露在函数内部的
			<code>this</code>
			上，它会指向当前的组件实例。
		</p>
		<VueDemoCode theme="vue" :code="vueDemoStyleOptionCode" />
		<a
			class="d-block mt-7"
			href="/"
			target="_blank"
			rel="noopener noreferrer"
			@click.prevent
		>
			<v-icon
				icon="far fa-circle-play"
				style="font-size: 1em; vertical-align: 0"
			></v-icon>
			在演练场中尝试一下
		</a>
		<h3 class="mt-12 mb-5">
			<span id="options-api">组合式 API (Composition API)</span>
			<a href="/" :class="$style.link" @click.prevent></a>
		</h3>
		<p>
			通过组合式 API，我们可以使用导入的 API
			函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与
			<code>&lt;script setup&gt;</code>
			搭配使用。这个 setup attribute 是一个标识，告诉 Vue
			需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，
			<code>&lt;script setup&gt;</code>
			中的导入和顶层变量/函数都能够在模板中直接使用。
		</p>
		<p>
			下面是使用了组合式 API 与
			<code>&lt;script setup&gt;</code>
			改造后和上面的模板完全一样的组件：
		</p>
		<VueDemoCode theme="vue" :code="vueDemoStyleComposable" />
		<a
			class="d-block mt-7"
			href="/"
			target="_blank"
			rel="noopener noreferrer"
			@click.prevent
		>
			<v-icon
				icon="far fa-circle-play"
				style="font-size: 1em; vertical-align: 0"
			></v-icon>
			在演练场中尝试一下
		</a>
		<h3 class="mt-12 mb-5">
			<span id="options-api">该选哪一个？</span>
			<a href="/" :class="$style.link" @click.prevent></a>
		</h3>
		<p>
			两种 API
			风格都能够覆盖大部分的应用场景。它们只是同一个底层系统所提供的两套不同的接口。实际上，选项式
			API 是在组合式 API 的基础上实现的！关于 Vue
			的基础概念和知识在它们之间都是通用的。
		</p>
		<p>
			选项式 API 以“组件实例”的概念为中心 (即上述例子中的
			<code>this</code>
			)，对于有面向对象语言背景的用户来说，这通常与基于类的心智模型更为一致。同时，它将响应性相关的细节抽象出来，并强制按照选项来组织代码，从而对初学者而言更为友好。
		</p>
		<p>
			组合式 API
			的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更加自由，也需要你对
			Vue
			的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。
		</p>
		<p>
			在
			<a href="/" @click.prevent>组合式 API FAQ</a>
			章节中，你可以了解更多关于这两种 API 风格的对比以及组合式 API
			所带来的潜在收益。
		</p>
		<p>如果你是使用 Vue 的新手，这里是我们的大致建议：</p>
		<ul class="pl-5">
			<li>
				在学习的过程中，推荐采用更易于自己理解的风格。再强调一下，大部分的核心概念在这两种风格之间都是通用的。熟悉了一种风格以后，你也能够很快地理解另一种风格。
			</li>
			<li>
				在生产项目中：
				<ul class="pl-5">
					<li>
						当你不需要使用构建工具，或者打算主要在低复杂度的场景中使用
						Vue，例如渐进增强的应用场景，推荐采用选项式 API。
					</li>
					<li>
						当你打算用 Vue 构建完整的单页应用，推荐采用组合式 API + 单文件组件。
					</li>
				</ul>
			</li>
		</ul>
		<p>
			在学习阶段，你不必只固守一种风格。在接下来的文档中我们会为你提供一系列两种风格的代码供你参考，你可以随时通过左上角的
			API 风格偏好来做切换。
		</p>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()
</script>

<style lang="scss" module>
	.link {
		color: var(--vuedemo-primary);
		font-weight: 500;
		position: absolute;
		inset: 0;

		&::after {
			content: '#';
			margin-left: -1em;
			opacity: 0;

			transition: opacity 0.3s;
		}

		&:hover::after {
			opacity: 1;
		}
	}
</style>
