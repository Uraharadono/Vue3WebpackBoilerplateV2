<template>
	<div class="about">
		<h1>This is an about page</h1>
		<button class="btn btn-primary" @click="navigateToLoginWithReturnUrl">
			Navigate to login with return url.
		</button>
		<br />
		<br />
		<button class="btn btn-primary" @click="navigateTo2FactSetup">Navigate to 2 fact setup.</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
	name: 'AboutPage',
	mounted() {
		// eslint-disable-next-line no-undef
		const absoluteUrl = API_BASE_URL;
		console.log(absoluteUrl);
	},
	methods: {
		navigateToLoginWithReturnUrl() {
			const returnPath = window.location.pathname;
			router.push({
				name: 'Login',
				query: { returnUrl: returnPath },
			});
		},
		navigateTo2FactSetup() {
			router.push({
				name: 'Setup2FA',
			});
		},
	},
});
</script>
