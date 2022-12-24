//import router from "@/router";
//import ajax from "@/common/ajax";
//import { isNullOrWs } from "@/common/methods";

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

//// For whatever effing reason, this wont work in vue:
//// https://stackoverflow.com/questions/45995136/export-default-was-not-found
//// export const authentication = {
////     namespaced: true,
////     state: initialState,
////     actions: {
////         login({ dispatch, commit }, { username, password }) {
////             commit('loginRequest', { username });

////             // userService.login(username, password)
////             //     .then(
////             //         user => {
////             //             commit('loginSuccess', user);
////             //             router.push('/');
////             //         },
////             //         error => {
////             //             commit('loginFailure', error);
////             //             dispatch('alert/error', error, { root: true });
////             //         }
////             //     );
////         },
////         logout({ commit }) {
////             // userService.logout();
////             commit('logout');
////         }
////     },
////     mutations: {
////         loginRequest(state, user) {
////             state.status = { loggingIn: true };
////             state.user = user;
////         },
////         loginSuccess(state, user) {
////             state.status = { loggedIn: true };
////             state.user = user;
////         },
////         loginFailure(state) {
////             state.status = {};
////             state.user = null;
////         },
////         logout(state) {
////             state.status = {};
////             state.user = null;
////         }
////     }
//// }
