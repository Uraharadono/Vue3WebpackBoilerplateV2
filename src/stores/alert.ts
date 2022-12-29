import { defineStore } from 'pinia';

const generalErrorMsg = 'Er is een fout opgetreden. Probeer het opnieuw.';

interface State {
	type: string;
	message: string;
	icon: string;
}

// No need to add "Store" suffix to id (first param of defineStore), it will be added by default: https://pinia.vuejs.org/cookbook/options-api.html#giving-access-to-the-whole-store
const useAlertStore = defineStore('alert', {
	state: (): State => ({
		type: '',
		message: 'NESTO',
		icon: '',
	}),
	getters: {
		// No getters
		getState(): object {
			return {
				type: this.type,
				message: this.message,
				icon: this.icon,
			};
		},
	},
	actions: {
		primary(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-primary';
			this.message = message;
			this.icon = 'nesto';
		},
		secondary(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-secondary';
			this.message = message;
			this.icon = 'nesto';
		},
		success(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-success';
			this.message = message;
			this.icon = 'nesto';
		},
		danger(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-danger';
			this.message = message;
			this.icon = 'nesto';
		},
		warning(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-warning';
			this.message = message;
			this.icon = 'nesto';
		},
		info(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-info';
			this.message = message;
			this.icon = 'nesto';
		},
		light(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-light';
			this.message = message;
			this.icon = 'nesto';
		},
		dark(message: string) {
			message = message ? message : generalErrorMsg;
			this.type = 'alert-dark';
			this.message = message;
			this.icon = 'nesto';
		},
		clear() {
			this.type = '';
			this.message = '';
			this.icon = '';
		},
	},
});

export default useAlertStore;
