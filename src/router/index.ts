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
		],
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

//router.beforeEach((to, from, next) => {
//  // redirect to login page if not logged in and trying to access a restricted page
//  const publicPages = [
//      "/login",
//      "/login-2fa",
//      "/2fa-setup",
//      "/register",
//      "/forgot-password",
//      "/reset-password",
//  ];
//  const authRequired = !publicPages.includes(to.path);
//  const loggedInUser = localStorage.getItem("currentUser");

//  console.log(authRequired)
//  if (authRequired) {
//      if(!loggedInUser)
//      {
//          // return next("/login");

//          const returnPath = window.location.pathname;
//          return next({ name: 'Login', query: { returnUrl: returnPath } });

//          // No need for this now, as we are dealing with this on the "Setup2FA" page
//          //if(loggedInUser.tfaEnabled && loggedInUser.token)
//          //    return next("/login-2fa");
//      }
//  }

//  next();
//});

export default router;
