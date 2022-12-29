<template>
	<ComponentLoader v-show="isLoading" />
	<h3>Please wait while we activate your account !</h3>
</template>
<script>
import ComponentLoader from '@/components/ComponentLoader.vue';
import { mapActions } from 'pinia';
import router from '@/router';
import { authenticationStore } from '@/stores/authentication';

export default {
	name: 'ConfirmEmail',
	components: { ComponentLoader },
	data() {
		return {
			isLoading: false,
		};
	},
	async mounted() {
		const routeQueryParams = router.currentRoute.value.query;
		var data = {
			userId: routeQueryParams.uid,
			code: routeQueryParams.code,
		};
		this.isLoading = true;
		await this.confirmEmail(data);
		this.isLoading = false;
	},
	methods: {
		...mapActions(authenticationStore, { confirmEmail: 'confirmEmail' }),
	},
};
</script>
