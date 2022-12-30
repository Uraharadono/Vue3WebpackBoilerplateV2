<template>
	<div>
		<div class="container">
			<div class="log-in-page card">
				<div
					class="text-center custom-bg-color"
					style="overflow: visible; background: rgba(255, 255, 255, 0.2)"
				>
					<h3 class="card-header star-inserted">
						<span>Two factor verification</span>
					</h3>

					<div class="card-body" style="padding: 0px; overflow: visible">
						<ComponentLoader v-show="isLoading" />
						<form @submit.prevent="handleSubmit">
							<div class="form-group m-4">
								<div
									class="col-8 offset-2"
									:class="[v$.twoFactorCode.$error ? 'is-invalid' : '', '']"
								>
									<input
										v-model="v$.twoFactorCode.$model"
										class="form-control"
										type="text"
										placeholder="Enter the code from your authenticator device"
									/>
								</div>
								<div
									v-if="!v$.twoFactorCode.required && v$.twoFactorCode.$dirty"
									class="text-danger"
								>
									Field is required
								</div>
								<div
									v-if="!v$.twoFactorCode.minLength && v$.twoFactorCode.$dirty"
									class="text-danger"
								>
									Pin is longer than that!
								</div>
								<div
									v-if="!v$.twoFactorCode.maxValue && v$.twoFactorCode.$dirty"
									class="text-danger"
								>
									Something is wrong with your pin!
								</div>
							</div>

							<div class="d-grid gap-2">
								<button tabindex="0" class="btn btn-primary blue-gradient">
									<span class="btn-text">Verify</span>

									<span class="btn-loader">
										<i class="icon icofont-spinner" />
									</span>
								</button>
							</div>
						</form>
						<!--<div class="forgot-box">
              <span class="divider" />
              <router-link to="/2fa-setup">
                Authenticator missing ?
              </router-link>
            </div>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxValue } from '@vuelidate/validators';
import ComponentLoader from '@/components/ComponentLoader.vue';
// import { ref, onMounted, computed } from 'vue';
import { mapActions } from 'pinia';
import { authenticationStore } from '@/stores/authentication';

export default {
	components: { ComponentLoader },
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			isLoading: false,
			twoFactorCode: '',
		};
	},
	validations: {
		twoFactorCode: {
			required,
			minLength: minLength(6),
			maxValue: maxValue(999999),
		},
	},
	methods: {
		...mapActions(authenticationStore, { loginWith2fa: 'loginWith2fa', logout: 'logout' }),
		async handleSubmit(e) {
			this.v$.$touch();
			if (this.v$.$invalid) return;

			this.isLoading = true;
			// Mapping can be done like this as well: "const { twoFactorCode, password } = this;"
			const data = {
				twoFactorCode: this.twoFactorCode,
			};
			await this.loginWith2fa(data);
			this.isLoading = false;
		},
	},
};
</script>
