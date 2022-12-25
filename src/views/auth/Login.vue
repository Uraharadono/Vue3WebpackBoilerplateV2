<template>
	<div class="container" style="width: 22rem">
		<ComponentLoader v-show="isLoading" />
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
				</div>
			</div>

			<!-- 2 column grid layout for inline styling -->
			<div class="row mb-4">
				<div class="col d-flex justify-content-center">
					<!-- Checkbox -->
					<div class="form-check">
						<input
							id="rememberMeCheckbox"
							v-model="rememberMe"
							class="form-check-input"
							type="checkbox"
							value=""
						/>
						<label class="form-check-label" for="rememberMeCheckbox"> Remember me </label>
					</div>
				</div>

				<div class="col">
					<!-- Simple link -->
					<router-link to="/forgot-password"> Forgot password? </router-link>
				</div>
			</div>

			<!-- Submit button -->
			<button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

			<!-- Register buttons -->
			<!--<div class="text-center">
			<p>Not a member? <a href="#!">Register</a></p>
		</div>-->
		</form>
	</div>
</template>

<script>
// import ajax from '@/common/ajax';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
// import { mapGetters, mapActions } from "vuex";
// import { authentication } from '@/store/modules/authentication';
import ComponentLoader from '@/components/ComponentLoader.vue';
// import { ref, onMounted, computed } from 'vue';

import { mapActions } from 'pinia';
import { authenticationStore } from '@/stores/authentication';

export default {
	name: 'Login',
	components: { ComponentLoader },
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			username: '',
			password: '',
			rememberMe: false,
			isLoading: false,
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
				minLength: minLength(8),
				$autoDirty: true,
			},
		};
	},
	computed: {
		//loggingIn() {
		//    return this.$store.state.authentication.status.loggingIn;
		//},
		// authenticationStore
	},
	created() {
		// reset login status
		// this.$store.dispatch('authentication/logout'); // this won't work like shown in example
		// this.logout();
	},
	methods: {
		...mapActions(authenticationStore, { login: 'login' }),
		// ...mapActions([authenticationStore, 'login']),
		async handleSubmit() {
			await this.v$.$touch();
			// const result = await this.v$.$validate(); // can also be used like so, if "result" is false, something is wrong
			if (await this.v$.$error) return;

			console.log('proslo je');

			this.isLoading = true;
			// Mapping can be done like this as well: "const { username, password } = this;"
			const data = {
				username: this.username,
				email: this.username,
				password: this.password,
				rememberMe: this.rememberMe,
			};
			await this.login(data);
			this.isLoading = false;
		},
		toggleRememberMe() {
			this.rememberMe = !this.rememberMe;
		},
	},
};
</script>

<style>
.is-invalid {
	border-color: red;
}
</style>
