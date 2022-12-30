<template>
	<div class="container" style="width: 22rem">
		<ComponentLoader v-show="isLoading" />

		<h3 class="card-header star-inserted">
			<span>Please reset your password in the form below:</span>
		</h3>

		<form @submit.prevent="handleSubmit">
			<div class="form-outline mb-4" :class="[v$.password.$error ? 'is-invalid' : '', '']">
				<div class="form-outline mb-4">
					<input v-model="password" type="password" class="form-control" placeholder="Password" />
					<div v-if="v$.password.$dirty">
						<div v-if="v$.password.required.$invalid" class="text-danger">Field is required</div>
						<div v-if="v$.password.minLength.$invalid" class="text-danger">
							Passwords in our system are a bit longer than that
						</div>
					</div>

					<input
						v-model="repeatPassword"
						type="password"
						class="form-control"
						placeholder="Repeat password"
					/>
					<div v-if="v$.repeatPassword.$dirty">
						<div v-if="v$.repeatPassword.required.$invalid" class="text-danger">
							Field is required
						</div>
						<div v-if="v$.repeatPassword.minLength.$invalid" class="text-danger">
							Passwords in our system are a bit longer than that
						</div>
					</div>
					<div v-if="v$.repeatPassword.sameAsPassword.$invalid" class="text-danger">
						Passwords do not match
					</div>
				</div>
			</div>

			<button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
		</form>
	</div>
</template>

<script>
import { parseUrlParams, isNullOrWs } from '@/common/methods';
import router from '@/router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import ComponentLoader from '@/components/ComponentLoader.vue';
import { mapActions } from 'pinia';
import { authenticationStore } from '@/stores/authentication';

export default {
	components: { ComponentLoader },
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			userId: null,
			code: null,
			isLoading: false,
			password: '',
			repeatPassword: '',
		};
	},
	validations() {
		return {
			password: {
				required,
				minLength: minLength(8),
				$autoDirty: true,
			},
			repeatPassword: {
				required,
				minLength: minLength(8),
				$autoDirty: true,
				sameAsPassword: sameAs(this.password),
			},
		};
	},
	mounted() {
		const urlParams = parseUrlParams();
		if (isNullOrWs(urlParams.uid) || isNullOrWs(urlParams.code)) {
			router.push('Home');
		}

		this.userId = urlParams.uid;
		this.code = urlParams.code;
	},
	methods: {
		...mapActions(authenticationStore, ['resetPassword']),
		async handleSubmit() {
			await this.v$.$touch();
			// const result = await this.v$.$validate(); // can also be used like so, if "result" is false, something is wrong
			if (await this.v$.$error) return;

			const data = {
				userId: this.userId,
				code: this.code,
				password: this.password,
				confirmPassword: this.repeatPassword,
			};

			this.isLoading = true;
			await this.resetPassword(data);
			this.isLoading = false;
		},
	},
};
</script>
