const option: SwiperOptions = {
	modules: [Navigation],
	navigation: true,
	loop: true,
	slidesPerView: 1,
	breakpointsBase: 'container',
	breakpoints: {
		430: {
			slidesPerView: 4,
		},
		300: {
			slidesPerView: 3,
			spaceBetween: -50,
		},
		200: {
			slidesPerView: 2,
			spaceBetween: -40,
		},
	},
}

export default (skillsCarousellEl: Ref<SwiperContainer | null>) =>
	onMounted(() => {
		if (skillsCarousellEl.value) {
			Object.assign(skillsCarousellEl.value, option)
			skillsCarousellEl.value.initialize()
		}
	})
