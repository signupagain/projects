<template>
	<div :class="$style.wrap">
		<v-icon
			:class="$style.dots"
			tag="span"
			icon="fas fa-ellipsis"
			style="font-size: 0.95em"
		></v-icon>
		<div :class="$style.widget">
			<div :class="[$style.group, $style['btn-wrap']]">
				<span class="clip">外觀</span>
				<button :class="[$style.btn, 'active']" type="button">
					<v-icon
						:class="$style['btn-icon']"
						icon="fas fa-moon"
						style="font-size: 0.8em"
					></v-icon>
				</button>
			</div>
			<div :class="$style.divider"></div>
			<div :class="[$style.group, $style['logo-wrap']]">
				<a :class="$style.logo" href="/" @click.prevent>
					<svg
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>GitHub</title>
						<path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
						/>
					</svg>
				</a>
				<a :class="$style.logo" href="/" @click.prevent>
					<svg
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>X</title>
						<path
							d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
						/>
					</svg>
				</a>
				<a :class="$style.logo" href="/" @click.prevent>
					<svg
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Discord</title>
						<path
							d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
	.wrap {
		position: relative;
		display: flex;
		align-items: center;
		margin-right: -16px;

		@media (max-width: 1280px) {
			&:hover .widget {
				visibility: visible;
				opacity: 1;
				transform: translateY(3px);
			}
		}
	}

	.dots {
		display: none !important;

		@media (max-width: 1280px) {
			display: block !important;
			margin-top: -0.35ex;
		}
	}

	.widget {
		display: flex;

		@media (max-width: 1280px) {
			position: absolute;
			top: calc(55px / 2 + 15px);
			right: 0;

			flex-flow: column;
			width: 192px;
			border: 1px solid rgba(112, 104, 92, 0.48);
			border-radius: 8px;
			background: var(--vuedemo-background);

			visibility: hidden;
			opacity: 0;
			transition:
				visibility 0.4s,
				opacity 0.4s,
				transform 0.4s;
		}
	}

	.divider {
		border-top: 1px solid rgba(112, 104, 92, 0.48);
	}

	.group {
		@media (max-width: 1280px) {
			padding: 0 16px;
			margin: 12px 0;
		}
	}

	.btn-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (max-width: 1280px) {
			& :global(.clip) {
				position: initial;
				width: initial;
				height: initial;
				clip-path: none;
				font-size: 12px;
				font-weight: 500;
				line-height: 28px;
				color: rgba(219, 216, 212, 0.6);
			}
		}
	}

	.btn {
		width: 40px;
		height: 22px;
		border-radius: 11px;
		background: #2f2f2f;
		border: 1px solid rgba(84, 84, 84, 0.65);
		position: relative;

		&:hover {
			border-color: var(--vuedemo-on-surface);
		}
	}

	.btn-icon {
		width: 18px !important;
		height: 18px !important;
		position: absolute !important;
		top: 1px;
		left: 1px;
		border-radius: 50%;
		background: #1a1a1a;
		color: var(--vuedemo-on-surface);

		:global(.active) & {
			transform: translate(18px);
		}
	}

	.logo-wrap {
		display: flex;
		align-items: center;
	}

	.logo {
		font-size: 0;
		color: rgba(219, 216, 212, 0.6);
		padding: 8px;

		&:hover {
			color: rgba(255, 255, 255, 0.87);
		}

		@media (max-width: 1280px) {
			margin-left: -8px;
		}

		& svg {
			width: 20px;
			height: 20px;
			fill: currentColor;
		}
	}
</style>
