import type { ThemeDefinition } from 'vuetify'

export const purpleTheme: ThemeDefinition = {
	dark: false,
	colors: {
		// Base Colors
		background: '#E1BEE7', // 更明亮和清新的紫色作為背景
		surface: '#9C27B0', // 更深的紫色作為表面顏色
		primary: '#673AB7', // 主色
		secondary: '#FFD54F', // 柔和的橙黃色，與主色形成暖冷對比
		success: '#81C784', // 清新的綠色，代表成功或正向行為
		warning: '#FFB74D', // 柔和的橙色，提示但不刺眼
		error: '#E57373', // 柔和的紅色，警告或錯誤提示
		info: '#64B5F6', // 輕快的藍色，用於資訊提示

		// On Colors (對比色)
		'on-background': '#212121', // 深灰色，與淺紫背景形成良好對比
		'on-surface': '#FFFFFF', // 白色，讓紫色表面上的文字清晰可見
		'on-primary': '#FFFFFF', // 白色，與主色良好對比
		'on-secondary': '#212121', // 深灰色，與橙色協調
		'on-success': '#FFFFFF', // 白色，清晰且對比強
		'on-warning': '#212121', // 深灰色，避免過亮
		'on-error': '#FFFFFF', // 白色，確保清晰度
		'on-info': '#FFFFFF', // 白色，保持一致性
	},
}
