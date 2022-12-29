/* eslint-disable @typescript-eslint/no-explicit-any */
import router from '@/router';
// import { useRoute } from 'vue-router';
import ajax from '@/common/ajax';
import { isNullOrWs } from '@/common/methods';
import { defineStore } from 'pinia';
import alertStore from '@/stores/alert';

// This cannot be done, as it was causing me the errors: https://github.com/vuejs/pinia/discussions/1900
// const aStore = alertStore(); // https://pinia.vuejs.org/core-concepts/actions.html#accessing-other-stores-actions

interface State {
	status: object | null;
	user?: any;
	firstName: string;
	rememberMe: boolean;
	email: string;
}

const localStorageuser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
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
		async login(data: any) {
			//this.status = { loggingIn: true };
			this.user = data.username;
			this.email = data.email; // // have to save it in case of 2fa
			this.rememberMe = data.rememberMe;

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
					alertStore().danger(e[0]);
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
			// window.location.replace('https://' + location.host + returnUrl);
			window.location.replace('http://' + location.host + returnUrl);
		},
		loginWith2fa(data: any) {
			const postData = {
				twoFactorCode: data.twoFactorCode,
				userName: this.user,
				email: this.email,
				rememberMe: this.rememberMe,
			};

			return ajax
				.post(`/api/Auth/LoginWith2fa`, postData)
				.then((response: object) => {
					localStorage.setItem('currentUser', JSON.stringify(response));
					this.loginSuccess(response);
				})
				.catch((e: string[]) => {
					console.error(e);
					alertStore().danger(e[0]);
				});
		},
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
					alertStore().success('We have sent further instructions to your email !');
				})
				.catch((e: any) => {
					console.error(e);
					alertStore().danger(e[0]);
				});
		},
		resetPassword(data: any) {
			return (
				ajax
					.post(`/api/Auth/ResetPassword`, data)
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.then((response: any) => {
						alertStore().success('Password reset! Please login to access your account.');
						router.push('login');
					})
					.catch((e: any) => {
						console.error(e);
						alertStore().danger(e[0]);
					})
			);
		},
		register(data: any) {
			return ajax
				.post(`/api/Auth/Register`, data)
				.then((response: any) => {
					console.log(response);
					alertStore().success('Password reset! Please login to access your account.');
					// it should be like below, so user should receive email, then activate account, then proceed to login.
					// however, this is poco or in other words testing, so server will return us the return url
					// router.push('login');
					window.location = response;
				})
				.catch((e: any) => {
					console.error(e);
					alertStore().danger(e[0]);
				});
		},
		async confirmEmail(data: any) {
			return (
				ajax
					.post(`/api/Auth/ConfirmEmail`, data)
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.then((response: any) => {
						alertStore().success('Account activated! Please login to access your account.');
						router.push('login');
					})
					.catch((e: any) => {
						console.error(e);
						alertStore().danger(e[0]);
					})
			);
		},
	},
});
