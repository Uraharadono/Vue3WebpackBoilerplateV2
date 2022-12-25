/* eslint-disable @typescript-eslint/no-explicit-any */
import router from '@/router';
// import { useRoute } from 'vue-router';
import ajax from '@/common/ajax';
import { isNullOrWs } from '@/common/methods';
import { defineStore } from 'pinia';
// import { useAuthPreferencesStore } from './auth-preferences'
// import { useAuthEmailStore } from './auth-email'
// import vuexStore from '@/store' // for gradual conversion, see fullUserDetails

interface State {
	status: object | null;
	user?: object;
	firstName: string;
	rememberMe: boolean;
}

const localStorageuser = JSON.parse(localStorage.getItem('currentUser'));
const initialState = localStorageuser
	? { status: { loggedIn: true }, localStorageuser }
	: { status: {}, user: null };

export const authenticationStore = defineStore('authUser', {
	// convert to a function
	state: (): State => ({
		status: initialState.status,
		user: initialState.user,
		firstName: '',
		rememberMe: false,
	}),
	getters: {
		// No getter
	},
	actions: {
		async login(data: object) {
			return ajax
				.post(`/api/Auth/Login`, data)
				.then((response: any) => {
					localStorage.setItem('currentUser', JSON.stringify(response));

					// No 2 Factor authentication
					if (!response.tfaEnabled) this.loginSuccess(response);
					// Has 2 factor authentication
					else {
						if (isNullOrWs(response.twoFactorCode)) router.push('2fa-setup');
						else router.push('login-2fa');
					}
				})
				.catch((e: any) => {
					console.error(e);
					// dispatch('alert/danger', e[0], { root: true });
				});
		},
		loginSuccess(user: object) {
			this.status = { loggedIn: true };
			this.user = user;

			let returnUrl = '';
			if (router.currentRoute.value.query.returnUrl != undefined)
				returnUrl = router.currentRoute.value.query.returnUrl;

			// Couple of points here:
			// I need to redirect to main menu again like this so it reloads navigation, in order to populate the main menu with events and proper visibility
			// I am adding "http" in fron cause of: https://stackoverflow.com/questions/64797802/what-is-this-scheme-dont-have-a-registered-handler-error
			window.location.replace('https://' + location.host + returnUrl);
		},
		//loginWith2fa({ dispatch, commit }, data) {
		//	const postData = {
		//		twoFactorCode: data.twoFactorCode,
		//		userName: this.user,
		//		email: this.email,
		//		rememberMe: this.rememberMe,
		//	};

		//	return ajax
		//		.post(`/api/Auth/LoginWith2fa`, postData)
		//		.then((response) => {
		//			localStorage.setItem('currentUser', JSON.stringify(response));
		//			commit('loginSuccess', response);
		//		})
		//		.catch((e) => {
		//			console.error(e);
		//			dispatch('alert/danger', e[0], { root: true });
		//		});
		//},
		//logout({ commit }) {
		//	// remove user from local storage to log user out
		//	localStorage.removeItem('currentUser');

		//	commit('logout');
		//},
		//async forgotPassword({ dispatch, commit }, email) {
		//	const response = await ajax
		//		.post(`/api/Auth/ForgotPassword`, { email: email })
		//		.then((response) => {
		//			dispatch('alert/success', 'We have sent further instructions to your email !', {
		//				root: true,
		//			});
		//		})
		//		.catch((e) => {
		//			console.error(e);
		//			dispatch('alert/danger', e[0], { root: true });
		//		});
		//},
		//resetPassword({ dispatch, commit }, data) {
		//	return ajax
		//		.post(`/api/Auth/ResetPassword`, data)
		//		.then((response) => {
		//			dispatch('alert/success', 'Password reset! Please login to access your account.', {
		//				root: true,
		//			});
		//			router.push('login');
		//		})
		//		.catch((e) => {
		//			console.error(e);
		//			dispatch('alert/danger', e[0], { root: true });
		//		});
		//},

		//loginRequest(state, data) {
		//	state.status = { loggingIn: true };
		//	state.user = data.username;

		//	state.email = data.email;
		//	state.rememberMe = data.rememberMe;
		//},

		//loginFailure(state) {
		//	state.status = {};
		//	state.user = null;
		//},

		//clearUser() {
		//	// easily reset state using `$reset`
		//	this.$reset();

		//	// old way of doing things
		//	//  state.status = {};
		//	//  state.user = null;
		//},

		//// no context as first argument, use `this` instead
		//async loadUser (id: number) {
		//  if (this.userId !== null) throw new Error('Already logged in')
		//  const res = await api.user.load(id)
		//  this.updateUser(res)
		//},
		//// mutations can now become actions, instead of `state` as first argument use `this`
		//updateUser (payload) {
		//  this.firstName = payload.firstName
		//  this.lastName = payload.lastName
		//  this.userId = payload.userId
		//},
		//// easily reset state using `$reset`
		//clearUser () {
		//  this.$reset()
		//}
	},
});
