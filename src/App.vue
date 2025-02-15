<template>
	<div id="nav">
		<router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
		<router-link to="/playground/toggle">Playground</router-link> |
		<router-link to="/authentication-info">Authentication info</router-link> |
		<router-link to="/running-locally">Running locally</router-link> |
		<router-link v-if="!currentUser.token" to="/login">Login</router-link> |
		<i
			v-if="currentUser.token"
			class="fa-solid fa-right-from-bracket"
			style="cursor: pointer"
			@click="doLogout"
		></i>
		|
	</div>

	<!-- Alert Component to display static messages on our screen.  -->
	<!-- access store property from store by store name + const word "Store" -->
	<!-- https://pinia.vuejs.org/cookbook/options-api.html -->
	<!-- example for accessing 'appConfig' getCampagne getter -->
	<div v-if="alertStore.message" :class="`alert ${alertStore.type} no-margin`">
		<div class="row justify-content-end">
			<div class="col-4">
				{{ alertStore.message }}
			</div>
			<div class="col-4">
				<i class="fa-solid fa-rectangle-xmark" @click="clearAlert" />
			</div>
		</div>
	</div>

	<router-view />
</template>
<script lang="ts">
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapStores } from 'pinia';
import alertStore from '@/stores/alert';
import { authenticationStore } from '@/stores/authentication';

export default {
	computed: {
		...mapStores(alertStore),
		currentUser: {
			// getter
			get() {
				const localStorageUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
				return localStorageUser;
			},
			// setter
			set(newValue) {
				// Note: we are using destructuring assignment syntax here.
				// [this.firstName, this.lastName] = newValue.split(' ');
			},
		},
	},
	watch: {
		// method being used by "alert.js"
		// TODO: Check if this can be moved to router
		$route(to, from) {
			this.clearAlert(); // clear alert on location change
		},
	},
	methods: {
		...mapActions(alertStore, { clearAlert: 'clear' }),

		...mapActions(authenticationStore, { logout: 'logout' }),
		doLogout() {
			this.logout();
			this.$router.go(); // reload page to setup menu and redirect to login
		},
	},
};
</script>

<style lang="scss" src="./assets/styles/bundle.scss"></style>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
