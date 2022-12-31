import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import * as NProgress from 'nprogress';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue'),
	},
	{
		path: '/playground',
		name: 'Playgrond',
		component: () =>
			import(/* webpackChunkName: "playground" */ '../views/playground/playground.vue'),
		children: [
			{
				path: 'toggle',
				name: 'Toggle',
				component: () => import('../views/playground/toggle.vue'),
			},
			{
				path: 'content-tabs',
				name: 'ContentTabs',
				component: () => import('../views/playground/contentTabs.vue'),
			},
			{
				path: 'loader-1',
				name: 'Loader1',
				component: () => import('../views/playground/loader1.vue'),
			},
			{
				path: 'loader-2',
				name: 'Loader2',
				component: () => import('../views/playground/loader2.vue'),
			},
			{
				path: 'xhr-file-upload',
				name: 'XhrFileUpload',
				component: () => import('../views/playground/xhrFileUpload.vue'),
			},
			{
				path: 'modal',
				name: 'Modal',
				component: () => import('../views/playground/modal.vue'),
			},
			{
				path: 'are-you-sure-modal',
				name: 'Are you sure modal',
				component: () => import('../views/playground/areYouSureModal.vue'),
			},
			{
				path: 'autocomplete',
				name: 'Autocomplete',
				component: () => import('../views/playground/autocomplete/autocomplete.vue'),
			},
			{
				path: 'sephiroth',
				name: 'Sephiroth',
				component: () => import('../views/playground/sephiroth.vue'),
			},
		],
	},

	{
		path: '/running-locally',
		name: 'Running Locally',
		component: () =>
			import(/* webpackChunkName: "playground" */ '../views/playground/runningLocally.vue'),
	},

	// Authenticaton
	{
		path: '/authentication-info',
		name: 'Authentication Info',
		component: () =>
			import(/* webpackChunkName: "auth" */ '../views/authentication-info/AuthenticationInfo.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Login.vue'),
	},
	{
		path: '/2fa-setup',
		name: 'Setup2FA',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Setup2FA.vue'),
	},
	{
		path: '/login-2fa',
		name: 'Login2FA',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Login2FA.vue'),
	},
	{
		path: '/forgot-password',
		name: 'Forgot password',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/ForgotPassword.vue'),
	},
	{
		path: '/reset-password',
		name: 'Reset password',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/ResetPassword.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Register.vue'),
	},
	{
		path: '/confirm-email',
		name: 'Confirm email',
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/ConfirmEmail.vue'),
	},

	//// Terms of service
	//{
	//	path: '/terms-of-service/NL',
	//	name: 'Terms of service - NL',
	//	component: () => import(/* webpackChunkName: "tos" */ '../views/Shared/TOS/TosNL.vue'),
	//},

	// otherwise redirect to page not found
	// { path: "*", redirect: "/" },
	{
		path: '/:catchAll(.*)',
		component: () => import(/* webpackChunkName: "other" */ '../views/shared/404.vue'),
	},
];

const router = createRouter({
	history: createWebHistory('/'), // v3 equivalent: mode: "history",
	// also, The base option is now passed as the first argument to createWebHistory (and other histories):  base: "/",
	routes,
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});

// This logic should be uncomented, but since not everyone wants to use components to use login as well, I am keeping it here, and I will mention it in the readme
router.beforeEach((to, from, next) => {
	//// redirect to login page if not logged in and trying to access a restricted page
	//const publicPages = [
	//	'/login',
	//	'/login-2fa',
	//	'/2fa-setup',
	//	'/register',
	//	'/forgot-password',
	//	'/reset-password',
	//];
	//const authRequired = !publicPages.includes(to.path);
	//const loggedInUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
	//const userHasToken = loggedInUser.tfaEnabled === false ? true : loggedInUser.token != null;

	//if (authRequired) {
	//	if (!loggedInUser || !userHasToken) {
	//		// Return URL: in case we interrupted the user's work flow.
	//		const returnPath = window.location.pathname;
	//		return next({ name: 'Login', query: { returnUrl: returnPath } });

	//		// No need for this now, as we are dealing with this on the "Setup2FA" page
	//		//if(loggedInUser.tfaEnabled && loggedInUser.token)
	//		//    return next("/login-2fa");
	//	}
	//}

	next();
});

export default router;
