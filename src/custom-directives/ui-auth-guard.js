/* eslint-disable no-unused-vars */
import { currentUser } from '@/common/auth-header';
import { anyMatchInArray } from '@/common/methods';

/* Helper links:
 1.) https://forum.vuejs.org/t/vue-v-visible-directive-help/76064
 2.) https://v2.vuejs.org/v2/guide/custom-directive.html
 3.) https://forum.vuejs.org/t/vue-warn-fail-to-resolve-directive-tiltle/20512/3

  Helper links for v-if part:
  1.) https://stackoverflow.com/questions/43003976/a-custom-directive-similar-to-v-if-in-vuejs
  2.) https://stackoverflow.com/questions/47511243/create-a-custom-conditional-render-directive-in-vue-js
*/

// I would have loved it if I could have just register it here, but mofo doesn't work.
// See point 3 of helper links.
// ___________________________________
// import Vue from 'vue';
// Register a global custom directive called `v-uiAuthGuard`
//Vue.directive('uiAuthGuard', {
//    inserted: function (el, binding, vnode) {
//        el.style.visibility = binding.value ? 'visible' : 'hidden'
//    }
//})

// Register a global custom directive called `v-uiAuthGuard`
export default {
	// When the bound element is inserted into the DOM...

	// AS per tutorial: https://learnvue.co/tutorials/vue-custom-directives
	// "directive hooks are different in Vue 2 and Vue 3"
	// inserted: function (el, binding, vnode) {

	// mounted – same as the old inserted hook
	mounted: function (el, binding, vnode) {
		//console.log("binding value", binding.value)
		//console.log("current user roles", currentUser.roles)

		const hasPermission = anyMatchInArray(binding.value, currentUser.roles);
		// console.log("hasPermission", hasPermission);

		// This will hide element - basically v-show
		// el.style.visibility = hasPermission ? 'visible' : 'hidden'

		// This will remove element - basically v-if
		if (!hasPermission) el.parentNode.removeChild(el);
	},
};
