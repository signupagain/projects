<template>
	<VueDemoBlock :id title="简介" tag="h1">
		<section :class="$style.wrap">
			<h2 :class="$style.h2">
				<v-icon icon="fas fa-circle-info" size="x-small"></v-icon>
				你正在阅读的是 Vue 3 的文档！
			</h2>
			<ul class="pl-10" style="color: var(--vuedemo-on-surface)">
				<li>
					Vue 2 已于 2023 年 12 月 31 日停止维护。详见
					<a
						:class="$style.link"
						href="/"
						target="_blank"
						rel="noopener noreferrer"
						@click.prevent
					>
						Vue 2 终止支持 (EOL)
					</a>
					。
				</li>
				<li>
					想從 Vue 2 升級？ 請參考
					<a
						:class="$style.link"
						href="/"
						target="_blank"
						rel="noopener noreferrer"
					>
						遷移指南
					</a>
					。
				</li>
			</ul>
		</section>
		<a
			:class="$style.banner"
			href="/"
			target="_blank"
			rel="noopener noreferrer"
			@click.prevent
		>
			<img
				alt="Vue Mastery banner"
				width="96px"
				height="56px"
				src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png"
			/>
			<p>
				在
				<span>VueMastery</span>
				上观看视频课程学习 Vue
			</p>
			<div :class="$style.logo">
				<img
					alt="Vue Mastery Logo"
					width="25px"
					src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png"
				/>
			</div>
		</a>
	</VueDemoBlock>
</template>

<script setup lang="ts">
	defineProps<{ id: string }>()
</script>

<style lang="scss" module>
	.wrap {
		margin: 28px 0;
		padding: 20px 24px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.6;
		background: var(--vuedemo-surface);

		& li {
			margin: 0;
		}
	}

	.h2 {
		color: var(--vuedemo-on-background);
		margin: 0 0 8px -6px;
		font-size: 15px;

		display: flex;
		align-items: center;
		gap: 10px;
	}

	.banner {
		display: flex;
		align-items: center;
		gap: 16px;

		color: var(--vuedemo-on-background);
		padding: 8px;
		background: var(--vuedemo-surface);
		border-radius: 8px;

		p {
			margin: 0;
			font-size: 14px;
		}

		span {
			color: var(--vuedemo-primary);
		}
	}

	.logo {
		flex: none;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--vuedemo-on-background);
		margin-left: auto;

		display: grid;
		place-items: center;
	}
</style>
