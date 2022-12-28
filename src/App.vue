<template>
	<div id="nav">
		<router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
		<router-link to="/playground/toggle">Playground</router-link> |
		<router-link to="/login">Login</router-link> |
	</div>

	<!-- ALERT Component to display static messages on our screen.  -->
	<div v-if="alert.data.message" :class="`alert ${alert.data.type} no-margin`">
		<div class="row justify-content-end">
			<div class="col-4">
				{{ alert.data.message }}
			</div>
			<div class="col-4">
				<i class="fa-solid fa-rectangle-xmark" @click="alert.close" />
			</div>
		</div>
	</div>

	<router-view />
</template>
<script>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mapActions, mapState } from 'pinia';
import { alertStore } from '@/stores/alert';

export default {
	computed: {
		alert() {
			return {
				data: this.getState(),
				close: () => this.clear(),
			};
		},
	},
	watch: {
		// method being used by "alert.js"
		// TODO: Check if this can be moved to router
		$route(to, from) {
			this.clear(); // clear alert on location change
		},
	},
	methods: {
		...mapActions(alertStore, ['clear']),
		...mapState(alertStore, ['getState']),
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
