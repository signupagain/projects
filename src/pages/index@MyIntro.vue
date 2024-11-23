<template>
	<v-card
		tag="aside"
		class="pa-10 text-center elevation-10 position-sticky"
		style="top: 60px"
	>
		<div :class="$style.avatar">
			<v-img src="@/assets/avatar.png" cover></v-img>
		</div>
		<v-card-title tag="p">阿彥</v-card-title>
		<v-card-subtitle tag="p" style="white-space-collapse: collapse">
			<span>努力</span>
			<wbr />
			<span>自學前端</span>
			<wbr />
			<span>的</span>
			<wbr />
			<span>菜鳥</span>
		</v-card-subtitle>
		<v-card-text>
			<ul style="list-style: none">
				<li
					v-for="(color, skill) of skills"
					:key="skill"
					:class="$style.skill"
					:style="{ '--color': color }"
					v-text="skill"
				></li>
			</ul>
		</v-card-text>
		<v-card-actions class="justify-center">
			<a
				v-for="(href, icon) of links"
				:key="icon"
				class="text-primary-text"
				:href
				target="_blank"
			>
				<v-icon :icon></v-icon>
			</a>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
	definePage({
		meta: {
			layout: 'home',
		},
	})

	const skills = {
		HTML: '#f16b32',
		CSS3: '#2565f2',
		TYPESCRIPT: '#2565f2',
		SASS: '#d87faa',
		VUE: '#43bc86',
		VUETIFY: '#209bf7',
		GIT: '#f16b32',
	}

	const links = {
		'fab fa-github': 'https://github.com/signupagain',
	}
</script>

<style lang="scss" module>
	.skill {
		font-size: 0.8em;
		font-weight: bold;
		letter-spacing: 0.12em;
		display: inline-block;
		padding: 0.35em 0.5em;
		margin: 0.2em;
		border-radius: 0.3em;
		background: var(--color);
		user-select: none;

		@media (max-width: 225px) {
			display: block;

			aside:has(&) {
				padding: 40px 0 !important;
			}
		}
	}

	.avatar {
		overflow: hidden;
		border-radius: 50%;
		max-width: 140px;
		width: 100%;
		aspect-ratio: 1;
		margin: auto;

		@media (max-width: 225px) {
			margin: 0 20px;
		}
	}
</style>
