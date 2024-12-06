/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

type XOR<K, T> =
	K | T extends object ?
		(K & { [key in keyof T]?: never }) | (T & { [key in keyof K]?: never })
	:	K | T
