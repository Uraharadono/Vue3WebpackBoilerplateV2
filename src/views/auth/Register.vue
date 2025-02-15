<template>
	<div class="container" style="width: 22rem">
		<ComponentLoader v-show="isLoading" />
		<h5>Register new user</h5>
		<form @submit.prevent="handleSubmit">
			<!-- Email input -->
			<div class="form-outline mb-4" :class="[v$.username.$error ? 'is-invalid' : '', '']">
				<input
					v-model.trim="username"
					type="username"
					class="form-control"
					placeholder="Email address"
				/>
				<div v-if="v$.username.required.$invalid && v$.username.$dirty" class="text-danger">
					Field is required
				</div>
				<div v-if="v$.username.email.$invalid && v$.username.$dirty" class="text-danger">
					Field has to be email
				</div>
			</div>

			<!-- Password input -->
			<div class="form-outline mb-4">
				<input v-model="password" type="password" class="form-control" placeholder="Password" />
				<div v-if="v$.password.$dirty">
					<div v-if="v$.password.required.$invalid" class="text-danger">Field is required</div>
					<div v-if="v$.password.minLength.$invalid" class="text-danger">
						Passwords in our system are a bit longer than that
					</div>
					<div v-if="v$.password.oneNumber.$invalid" class="text-danger">
						You need to add 1 number to password
					</div>
					<div v-if="v$.password.oneUppercase.$invalid" class="text-danger">
						You need to add 1 uppercase character to password
					</div>
				</div>
			</div>

			<!-- Password repeat input -->
			<div class="form-outline mb-4">
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

			<!-- First name input -->
			<div class="form-outline mb-4" :class="[v$.firstName.$error ? 'is-invalid' : '', '']">
				<input
					v-model.trim="firstName"
					type="firstName"
					class="form-control"
					placeholder="First name"
				/>
				<div v-if="v$.firstName.required.$invalid && v$.firstName.$dirty" class="text-danger">
					Field is required
				</div>
			</div>

			<!-- Last name input -->
			<div class="form-outline mb-4" :class="[v$.lastName.$error ? 'is-invalid' : '', '']">
				<input
					v-model.trim="lastName"
					type="lastName"
					class="form-control"
					placeholder="Last name"
				/>
				<div v-if="v$.lastName.required.$invalid && v$.lastName.$dirty" class="text-danger">
					Field is required
				</div>
			</div>

			<!-- Title input -->
			<div class="form-outline mb-4" :class="[v$.title.$error ? 'is-invalid' : '', '']">
				<input v-model.trim="title" type="title" class="form-control" placeholder="Title" />
				<div v-if="v$.title.required.$invalid && v$.title.$dirty" class="text-danger">
					Field is required
				</div>
			</div>

			<!-- Submit button -->
			<button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
		</form>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, sameAs } from '@vuelidate/validators';
import { oneNumber, oneUppercase } from '@/common/custom-validators';
import ComponentLoader from '@/components/ComponentLoader.vue';
// import { ref, onMounted, computed } from 'vue';
import { mapActions, mapState, mapStores } from 'pinia';
import { authenticationStore } from '@/stores/authentication';

export default {
	name: 'Register',
	components: { ComponentLoader },
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			isLoading: false,
			username: '',
			password: '',
			repeatPassword: '',

			firstName: '',
			lastName: '',
			title: '',
		};
	},
	validations() {
		return {
			username: {
				required,
				email,
				minLength: minLength(6),
				$autoDirty: true,
			},
			password: {
				required,
				oneNumber,
				oneUppercase,
				minLength: minLength(8),
				$autoDirty: true,
			},
			repeatPassword: {
				required,
				oneNumber,
				oneUppercase,
				minLength: minLength(8),
				sameAsPassword: sameAs(this.password),
				$autoDirty: true,
			},
			firstName: { required, $autoDirty: true },
			lastName: { required, $autoDirty: true },
			title: { required, $autoDirty: true },
		};
	},
	computed: {},
	methods: {
		...mapActions(authenticationStore, { register: 'register' }),
		async handleSubmit() {
			await this.v$.$touch();
			// const result = await this.v$.$validate(); // can also be used like so, if "result" is false, something is wrong
			if (await this.v$.$error) return;

			this.isLoading = true;
			// Mapping can be done like this as well: "const { username, password } = this;"
			const data = {
				username: this.username,
				email: this.username,
				password: this.password,
				confirmPassword: this.repeatPassword,
				firstName: this.firstName,
				lastName: this.lastName,
				title: this.title,
			};
			await this.register(data);
			this.isLoading = false;
		},
	},
};
</script>

<style>
.is-invalid {
	border-color: red;
}
</style>
