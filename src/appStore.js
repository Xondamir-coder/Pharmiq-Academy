import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		showPreloader: true,
	}),
	actions: {
		setShowPreloader(value) {
			this.showPreloader = value;
		},
	},
});
