<template>
	<div class="container" style="width: 22rem">
		<ComponentLoader v-show="isLoading" />

		<h3 class="card-header star-inserted">
			<span>Please enter your email below </span>
		</h3>

		<form @submit.prevent="handleSubmit">
			<!-- Email input -->
			<div class="form-outline mb-4" :class="[v$.email.$error ? 'is-invalid' : '', '']">
				<input v-model.trim="email" type="email" class="form-control" placeholder="Email address" />
				<div v-if="v$.email.required.$invalid && v$.email.$dirty" class="text-danger">
					Field is required
				</div>
				<div v-if="v$.email.email.$invalid && v$.email.$dirty" class="text-danger">
					Field has to be email
				</div>
			</div>

			<!-- Submit button -->
			<button type="submit" class="btn btn-primary btn-block mb-4">Reset</button>
			<span class="btn-loader">
				<!--<i class="fa-solid fa-spinner"></i>-->
			</span>
		</form>
	</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import ComponentLoader from '@/components/ComponentLoader.vue';
import { mapActions } from 'pinia';
import { authenticationStore } from '@/stores/authentication';

export default {
	components: { ComponentLoader },
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			email: '',
			isLoading: false,
		};
	},
	validations: {
		email: {
			required,
			email,
			minLength: minLength(6),
			$autoDirty: true,
		},
	},
	methods: {
		...mapActions(authenticationStore, ['forgotPassword']),
		async handleSubmit() {
			this.v$.$touch();
			if (this.v$.$invalid) return;

			this.isLoading = true;
			await this.forgotPassword(this.email);
			this.isLoading = false;
		},
	},
};
</script>
