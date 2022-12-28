/* eslint-disable @typescript-eslint/no-explicit-any */
import router from '@/router';
// import { useRoute } from 'vue-router';
import ajax from '@/common/ajax';
import { isNullOrWs } from '@/common/methods';
import { defineStore } from 'pinia';
import { alertStore } from '@/stores/alert';
// import { useAuthPreferencesStore } from './auth-preferences'
// import { useAuthEmailStore } from './auth-email'
// import vuexStore from '@/store' // for gradual conversion, see fullUserDetails

const aStore = alertStore(); // https://pinia.vuejs.org/core-concepts/actions.html#accessing-other-stores-actions

interface State {
	status: object | null;
	user?: any;
	firstName: string;
	rememberMe: boolean;
	email: string;
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
		email: '', // have to save it in case of 2fa
	}),
	getters: {
		getEmail: (state) => state.email,
	},
	actions: {
		async login(data: object) {
			//this.status = { loggingIn: true };
			//this.user = data.username;
			this.email = data.email; // // have to save it in case of 2fa
			//this.rememberMe = data.rememberMe;

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
					aStore.danger(e[0]);
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
		// 			aStore.danger(e[0]);
		//		});
		//},
		logout() {
			// remove user from local storage to log user out
			localStorage.removeItem('currentUser');
			// easily reset state using `$reset`
			this.$reset();

			// old way of doing things
			//  state.status = {};
			//  state.user = null;
		},
		async forgotPassword(email: string) {
			return await ajax
				.post(`/api/Auth/ForgotPassword`, { email: email })
				.then((innerResponse: any) => {
					console.log(innerResponse);
					// console.info('We have sent further instructions to your email !');
					aStore.success('We have sent further instructions to your email !');
				})
				.catch((e: any) => {
					console.error(e);
					aStore.danger(e[0]);
				});
		},
		resetPassword(data: any) {
			return ajax
				.post(`/api/Auth/ResetPassword`, data)
				.then((response: any) => {
					console.log(response);
					aStore.success('Password reset! Please login to access your account.');
					router.push('login');
				})
				.catch((e: any) => {
					console.error(e);
					aStore.danger(e[0]);
				});
		},

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
