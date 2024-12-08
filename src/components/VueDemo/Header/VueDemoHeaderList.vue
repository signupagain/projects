<template>
	<ul
		v-for="(data, index) of vueDemoHeaderListData"
		:key="data.value"
		:class="$style.wrap"
	>
		<li :class="[$style.theme, { active: index === 0 }]">
			<span v-if="data.children" style="line-height: 55px; cursor: pointer">
				{{ data.value }}
				<v-icon
					v-if="data.children"
					icon="fas fa-chevron-down"
					style="vertical-align: 0.1ex; font-size: 0.8em"
				></v-icon>
			</span>
			<a
				v-else
				style="line-height: 55px"
				href="/"
				@click.prevent
				v-text="data.value"
			></a>
			<template v-if="data.children">
				<div v-if="data.hasGroup" :class="$style.dropdown">
					<section
						v-for="{ value: title, children } of data.children"
						:key="title"
						:class="$style.section"
					>
						<h3
							:class="[$style['dropdown-item'], $style['dropdown-title']]"
							v-text="title"
						></h3>
						<ul>
							<li v-for="{ value, isBlank } of children" :key="value">
								<a :class="$style['dropdown-item']" href="/" @click.prevent>
									{{ value }}
									<v-icon
										v-if="isBlank"
										icon="fas fa-arrow-up fa-rotate-by"
										style="--fa-rotate-angle: 45deg"
										size="x-small"
									></v-icon>
								</a>
							</li>
						</ul>
					</section>
				</div>
				<ul v-else :class="$style.dropdown">
					<li v-for="{ value, isBlank } of data.children" :key="value">
						<a :class="$style['dropdown-item']" href="/" @click.prevent>
							{{ value }}
							<v-icon
								v-if="isBlank"
								icon="fas fa-arrow-up fa-rotate-by"
								style="--fa-rotate-angle: 45deg"
								size="x-small"
							></v-icon>
						</a>
					</li>
				</ul>
			</template>
		</li>
	</ul>
	<div :class="$style.theme">
		<span :class="$style.translate">
			<svg
				width="16px"
				height="16px"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M4 0H6V2H10V4H8.86807C8.57073 5.66996 7.78574 7.17117 6.6656 8.35112C7.46567 8.73941 8.35737 8.96842 9.29948 8.99697L10.2735 6H12.7265L15.9765 16H13.8735L13.2235 14H9.77647L9.12647 16H7.0235L8.66176 10.9592C7.32639 10.8285 6.08165 10.3888 4.99999 9.71246C3.69496 10.5284 2.15255 11 0.5 11H0V9H0.5C1.5161 9 2.47775 8.76685 3.33437 8.35112C2.68381 7.66582 2.14629 6.87215 1.75171 6H4.02179C4.30023 6.43491 4.62904 6.83446 4.99999 7.19044C5.88743 6.33881 6.53369 5.23777 6.82607 4H0V2H4V0ZM12.5735 12L11.5 8.69688L10.4265 12H12.5735Z"
					fill="#000000"
				/>
			</svg>
			<span class="clip">更換語言</span>
		</span>
		<div :class="$style.dropdown" style="width: 192px">
			<ul>
				<li
					v-for="lng of vueDemoLanguages"
					:key="lng"
					:class="$style['translate-li']"
				>
					<a href="/" target="_blank" rel="noopener noreferrer" @click.prevent>
						{{ lng }}
						<v-icon
							icon="fas fa-arrow-up fa-rotate-by"
							style="--fa-rotate-angle: 45deg"
							size="x-small"
						></v-icon>
					</a>
					<a href="/" target="_blank" rel="noopener noreferrer" @click.prevent>
						<v-icon icon="fab fa-github" size="small"></v-icon>
					</a>
				</li>
			</ul>
			<hr :class="$style['translate-hr']" />
			<a
				:class="$style['translate-li']"
				href="/"
				target="_blank"
				rel="noopener noreferrer"
				@click.prevent
			>
				帮助我们翻译！
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	//
</script>

<style lang="scss" module>
	.wrap {
		font-size: 13px;
		display: flex;
	}

	.theme {
		padding: 0 12px;
		position: relative;
		display: grid;

		&:hover {
			& > a:only-child {
				color: var(--vuedemo-primary);
			}

			& > a:has(+ :is(div, ul)) {
				color: var(--vuedemo-on-surface);
			}
		}

		&:global(.active) {
			border-bottom: 1px solid var(--vuedemo-primary);
		}

		&:hover .dropdown {
			opacity: 1;
			visibility: visible;
			transform: translateY(3px);
		}
	}

	.dropdown {
		position: absolute;
		right: 12px;
		top: 100%;
		max-height: calc(100dvh - 55px);
		overflow: hidden auto;

		padding: 12px 0;
		margin-top: -13px;
		border-radius: 8px;
		white-space: nowrap;

		border: 1px solid rgba(84, 84, 84, 48%);
		background: var(--vuedemo-background);

		visibility: hidden;
		opacity: 0;
		transition:
			opacity 1s 0.3s,
			transform 0.5s,
			visibility 1.3s;
	}

	.dropdown-title {
		font-size: 10px;
		font-weight: 500;
		color: var(--vuedemo-on-surface);
	}

	.dropdown-item {
		display: block;
		padding: 0 18px;
		line-height: 28px;

		&:not(h3):hover {
			color: var(--vuedemo-primary);
		}
	}

	.section {
		&:not(:first-child) {
			padding-top: 11px;
			border-top: 1px solid rgba(84, 84, 84, 48%);
		}

		&:not(:last-child) {
			padding-bottom: 12px;
		}
	}

	.translate {
		line-height: 55px;
		display: flex;
		align-items: center;
		gap: 12px;

		&::before,
		&::after {
			content: '';
			width: 1px;
			height: 24px;
			background: rgba(84, 84, 84, 48%);
		}
	}

	.translate-li {
		padding: 0 14px;

		display: flex;
		justify-content: space-between;

		& + & {
			padding-top: 6px;
		}
	}

	.translate-hr {
		margin: 10px 0 12px;
		border: solid rgba(84, 84, 84, 48%);
		border-width: 2px 0 0;
	}
</style>
