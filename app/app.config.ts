export default defineAppConfig({
	avatar: {
		light: '/img/avatar.jpg',
		dark: '/img/avatar.jpg',
		alt: 'My profile picture',
	},
	links: [
		{
			'aria-label': 'My GitHub profile',
			to: 'https://github.com/signupagain',
			icon: 'simple-icons:github',
			target: '_blank',
		},
	],
	credits: 'Built with ZongYan • © ' + new Date().getFullYear(),
	ui: {
		colors: {
			primary: 'blue',
			neutral: 'neutral',
		},
		pageHero: {
			slots: {
				container: 'py-18 sm:py-24 lg:py-32',
				title:
					'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl whitespace-pre leading-tight',
				description:
					'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted',
			},
		},
	},
	navLinks: [
		{
			label: 'Home',
			to: '/',
		},
		{
			label: 'Projects',
			to: '/projects',
		},
		{
			label: 'About',
			to: '/about',
		},
	],
})
