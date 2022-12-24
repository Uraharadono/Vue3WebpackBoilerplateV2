//const user = JSON.parse(localStorage.getItem("currentUser"));
//const initialState = user
//    ? { status: { loggedIn: true }, user }
//    : { status: {}, user: null };

//const state = initialState;

//const getters = {};

//const actions = {
//    login({ dispatch, commit }, data) {
//        // commit("loginRequest", data.username);
//        commit("loginRequest", data);

//        return ajax
//            .post(`/api/Auth/Login`, data)
//            .then((response) => {
//                localStorage.setItem("currentUser", JSON.stringify(response));

//                // No 2 Factor authentication
//                if(!response.tfaEnabled)
//                    commit('loginSuccess', response);
//                // Has 2 factor authentication
//                else
//                {
//                    if(isNullOrWs(response.twoFactorCode))
//                        router.push("2fa-setup");
//                    else
//                        router.push("login-2fa");
//                }
//            })
//            .catch((e) => {
//                console.error(e);
//                dispatch('alert/danger', e[0], { root: true });
//            });
//    },
//    loginWith2fa({ dispatch, commit }, data) {
//        const postData = {
//            twoFactorCode: data.twoFactorCode,
//            userName: state.user,
//            email: state.email,
//            rememberMe: state.rememberMe,
//        };

//        return ajax
//            .post(`/api/Auth/LoginWith2fa`, postData)
//            .then((response) => {

//                localStorage.setItem("currentUser", JSON.stringify(response));
//                commit('loginSuccess', response);
//            })
//            .catch((e) => {
//                console.error(e);
//                dispatch('alert/danger', e[0], { root: true });
//            });
//    },
//    logout({ commit }) {
//        // remove user from local storage to log user out
//        localStorage.removeItem('currentUser');

//        commit("logout");
//    },
//    async forgotPassword({ dispatch, commit }, email) {
//        const response = await ajax
//            .post(`/api/Auth/ForgotPassword`, { email: email })
//            .then(response => {
//                dispatch('alert/success', "We have sent further instructions to your email !", { root: true });
//            })
//            .catch((e) => {
//                console.error(e);
//                dispatch('alert/danger', e[0], { root: true });
//            });
//    },
//    resetPassword({ dispatch, commit }, data) {
//        return ajax
//            .post(`/api/Auth/ResetPassword`, data)
//            .then((response) => {
//                dispatch('alert/success', "Password reset! Please login to access your account.", { root: true });
//                router.push("login");
//            })
//            .catch((e) => {
//                console.error(e);
//                dispatch('alert/danger', e[0], { root: true });
//            });
//    },
//};

//const mutations = {
//    loginRequest(state, data) {
//        state.status = { loggingIn: true };
//        state.user = data.username;

//        state.email = data.email;
//        state.rememberMe = data.rememberMe;
//    },
//    loginSuccess(state, user) {
//        state.status = { loggedIn: true };
//        state.user = user;

//        let returnUrl = "";
//        if(router.currentRoute.query.returnUrl != undefined)
//            returnUrl = router.currentRoute.query.returnUrl;

//        // Couple of points here:
//        // I need to redirect to main menu again like this so it reloads navigation, in order to populate the main menu with events and proper visibility
//        // I am adding "http" in fron cause of: https://stackoverflow.com/questions/64797802/what-is-this-scheme-dont-have-a-registered-handler-error
//        window.location.replace("https://" + location.host + returnUrl);
//    },
//    loginFailure(state) {
//        state.status = {};
//        state.user = null;
//    },
//    logout(state) {
//        state.status = {};
//        state.user = null;
//    },
//};

//export default {
//    state,
//    getters,
//    actions,
//    mutations,
//};

//export const authentication = {
//    actions: {},
//    mutations: {},
//};

import router from '@/router';
import { useRoute } from 'vue-router';
import ajax from '@/common/ajax';
import { isNullOrWs } from '@/common/methods';
import { defineStore } from 'pinia';
// import { useAuthPreferencesStore } from './auth-preferences'
// import { useAuthEmailStore } from './auth-email'
// import vuexStore from '@/store' // for gradual conversion, see fullUserDetails

interface State {
	//  firstName: string
	//  lastName: string
	//  userId: number | null
	user: object;
}

export const authentication = defineStore('authUser', {
	// convert to a function
	state: (): State => ({
		//firstName: '',
		//lastName: '',
		//userId: null
		user: null,
	}),
	getters: {
		//// firstName getter removed, no longer needed
		//fullName: (state) => `${state.firstName} ${state.lastName}`,
		//loggedIn: (state) => state.userId !== null,
		//// must define return type because of using `this`
		//fullUserDetails (state): FullUserDetails {
		//  // import from other stores
		//  const authPreferencesStore = useAuthPreferencesStore()
		//  const authEmailStore = useAuthEmailStore()
		//  return {
		//    ...state,
		//    // other getters now on `this`
		//    fullName: this.fullName,
		//    ...authPreferencesStore.$state,
		//    ...authEmailStore.details
		//  }
		//  // alternative if other modules are still in Vuex
		//  // return {
		//  //   ...state,
		//  //   fullName: this.fullName,
		//  //   ...vuexStore.state.auth.preferences,
		//  //   ...vuexStore.getters['auth/email'].details
		//  // }
		//}
	},
	actions: {
		login({ dispatch, commit }, data) {
			// commit("loginRequest", data.username);
			commit('loginRequest', data);

			return ajax
				.post(`/api/Auth/Login`, data)
				.then((response) => {
					localStorage.setItem('currentUser', JSON.stringify(response));

					// No 2 Factor authentication
					if (!response.tfaEnabled) commit('loginSuccess', response);
					// Has 2 factor authentication
					else {
						if (isNullOrWs(response.twoFactorCode)) router.push('2fa-setup');
						else router.push('login-2fa');
					}
				})
				.catch((e) => {
					console.error(e);
					dispatch('alert/danger', e[0], { root: true });
				});
		},
		loginWith2fa({ dispatch, commit }, data) {
			const postData = {
				twoFactorCode: data.twoFactorCode,
				userName: this.user,
				email: this.email,
				rememberMe: this.rememberMe,
			};

			return ajax
				.post(`/api/Auth/LoginWith2fa`, postData)
				.then((response) => {
					localStorage.setItem('currentUser', JSON.stringify(response));
					commit('loginSuccess', response);
				})
				.catch((e) => {
					console.error(e);
					dispatch('alert/danger', e[0], { root: true });
				});
		},
		logout({ commit }) {
			// remove user from local storage to log user out
			localStorage.removeItem('currentUser');

			commit('logout');
		},
		async forgotPassword({ dispatch, commit }, email) {
			const response = await ajax
				.post(`/api/Auth/ForgotPassword`, { email: email })
				.then((response) => {
					dispatch('alert/success', 'We have sent further instructions to your email !', {
						root: true,
					});
				})
				.catch((e) => {
					console.error(e);
					dispatch('alert/danger', e[0], { root: true });
				});
		},
		resetPassword({ dispatch, commit }, data) {
			return ajax
				.post(`/api/Auth/ResetPassword`, data)
				.then((response) => {
					dispatch('alert/success', 'Password reset! Please login to access your account.', {
						root: true,
					});
					router.push('login');
				})
				.catch((e) => {
					console.error(e);
					dispatch('alert/danger', e[0], { root: true });
				});
		},

		loginRequest(state, data) {
			state.status = { loggingIn: true };
			state.user = data.username;

			state.email = data.email;
			state.rememberMe = data.rememberMe;
		},
		loginSuccess(state, user) {
			state.status = { loggedIn: true };
			state.user = user;

			const returnUrl = '';

			const route = useRoute();
			const path = route.path;
			console.log(path);

			//if(router.currentRoute.query.returnUrl != undefined)
			//    returnUrl = router.currentRoute.query.returnUrl;

			// Couple of points here:
			// I need to redirect to main menu again like this so it reloads navigation, in order to populate the main menu with events and proper visibility
			// I am adding "http" in fron cause of: https://stackoverflow.com/questions/64797802/what-is-this-scheme-dont-have-a-registered-handler-error
			window.location.replace('https://' + location.host + returnUrl);
		},
		loginFailure(state) {
			state.status = {};
			state.user = null;
		},

		clearUser() {
			// easily reset state using `$reset`
			this.$reset();

			// old way of doing things
			//  state.status = {};
			//  state.user = null;
		},

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
