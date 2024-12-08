<template>
	<nav aria-label="Main site navigation">
		<ul :class="$style.wrap">
			<li v-for="({ title, list }, themeIndex) of vueDemoSiteList" :key="title">
				<section>
					<h3 :class="$style.title" v-text="title"></h3>
					<ul>
						<li v-for="(word, index) of list" :key="word">
							<a
								:class="[
									$style['list-item'],
									{ active: themeIndex === 0 && index === 0 },
								]"
								href="/"
								@click.prevent
								v-text="word"
							></a>
						</li>
					</ul>
				</section>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	//
</script>

<style lang="scss" module>
	.wrap {
		line-height: 20px;
		font-size: 12.5px;
		list-style: none;

		& ul {
			list-style: none;
		}

		:where(& :is(li, section, h3, ul)) {
			margin: 0.8em 0;
		}
	}

	.title {
		margin: 20px 0 4px;
		font-weight: 600;
		color: var(--vuedemo-on-background);
	}

	.list-item {
		display: block;
		color: var(--vuedemo-on-surface);

		&:hover {
			color: rgba(255, 255, 255, 0.87);
		}

		&:global(.active) {
			color: var(--vuedemo-primary);
			font-weight: 600;
		}
	}
</style>
