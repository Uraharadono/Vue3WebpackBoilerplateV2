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
