const generalErrorMsg = 'Er is een fout opgetreden. Probeer het opnieuw.';

export const alert = {
	namespaced: true,
	state: {
		type: null,
		message: null,
		icon: null,
	},
	actions: {
		primary({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('primary', message);
		},
		secondary({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('secondary', message);
		},
		success({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('success', message);
		},
		danger({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('danger', message);
		},
		warning({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('warning', message);
		},
		info({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('info', message);
		},
		light({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('light', message);
		},
		dark({ commit }, message) {
			message = message ? message : generalErrorMsg;
			commit('dark', message);
		},
		clear({ commit }) {
			commit('clear');
		},
	},
	mutations: {
		primary(state, message) {
			state.type = 'alert-primary';
			state.message = message;
			state.icon = 'nesto';
		},
		secondary(state, message) {
			state.type = 'alert-secondary';
			state.message = message;
			state.icon = 'nesto';
		},
		success(state, message) {
			state.type = 'alert-success';
			state.message = message;
			state.icon = 'nesto';
		},
		danger(state, message) {
			state.type = 'alert-danger';
			state.message = message;
			state.icon = 'nesto';
		},
		warning(state, message) {
			state.type = 'alert-warning';
			state.message = message;
			state.icon = 'nesto';
		},
		info(state, message) {
			state.type = 'alert-info';
			state.message = message;
			state.icon = 'nesto';
		},
		light(state, message) {
			state.type = 'alert-light';
			state.message = message;
			state.icon = 'nesto';
		},
		dark(state, message) {
			state.type = 'alert-dark';
			state.message = message;
			state.icon = 'nesto';
		},
		clear(state) {
			state.type = null;
			state.message = null;
			state.icon = null;
		},
	},
};
