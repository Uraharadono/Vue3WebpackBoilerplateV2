<template>
	<div class="container">
		<div class="setup-2fa-page card">
			<div
				class="text-center custom-bg-color"
				style="overflow: visible; background: rgba(255, 255, 255, 0.2)"
			>
				<h3 class="card-header star-inserted">Scan QR Code</h3>

				<div class="card-body" style="padding: 0px; overflow: visible">
					<ComponentLoader v-show="isLoading" />

					<div class="row">
						<div class="col-md-12">
							<b>Instructions</b>
						</div>
					</div>
					<div class="row mb-4">
						<div class="col-md-8 offset-md-2">
							<h5>Download a two-factor app if you are not using it yet</h5>

							<ul class="list-group">
								<li class="list-group-item">
									<div class="list-title-block">
										<h5 class="title">
											<a
												href="https://itunes.apple.com/us/app/google-authenticator/id388497605"
												target="_blank"
												>download from the AppStore</a
											>
										</h5>
									</div>
								</li>
								<li class="list-group-item">
									<div class="list-title-block">
										<h5 class="title">
											<a
												href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
												target="_blank"
												>download from the Google Play Store</a
											>
										</h5>
									</div>
								</li>
								<li class="list-group-item">
									<div class="list-title-block">
										<h5 class="title">
											<a
												href="https://www.microsoft.com/en-us/store/apps/authenticator/9wzdncrfj3rj"
												target="_blank"
												>download from the Microsoft Store</a
											>
										</h5>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div class="row mb-4">
						<div class="col-md-12">
							<h5>Scan QR Code</h5>
							<div>
								<div>
									<!--<qrcode v-bind:value="authenticatorUri" :options="{ width: 200 }" />-->

									<figure class="qrcode">
										<vue-qrcode
											:value="authenticatorUri"
											tag="img"
											:options="{
												// errorCorrectionLevel: 'Q',
												width: 200,
											}"
										/>
										<img
											class="qrcode__image"
											src="../../assets/images/logoShort.png"
											alt="Qr Code"
										/>
									</figure>
								</div>
								<div>
									<p>
										If you can't scan the code with your phone, use the details below to add it
										manually.
									</p>
									<p class="text-info">
										(Add Account -> Other account -> "Or enter Code manually" -> Secret key)
									</p>
									<p>
										<strong>Key:</strong>
										<code> {{ sharedKey }} </code>
									</p>
								</div>
							</div>
						</div>
					</div>

					<form class="login-form" @submit.prevent="handleSubmit">
						<div class="row mb-2">
							<label> Enter the resulting code </label>
							<div class="col-8 offset-2" :class="[v$.code.$error ? 'is-invalid' : '', '']">
								<input
									v-model="v$.code.$model"
									class="form-control"
									type="text"
									placeholder="Code"
								/>
							</div>
							<div v-if="!v$.code.required && v$.code.$dirty" class="text-danger">
								Field is required
							</div>
							<div v-if="!v$.code.minLength && v$.code.$dirty" class="text-danger">
								Pin is longer than that!
							</div>
							<div v-if="!v$.code.maxValue && v$.code.$dirty" class="text-danger">
								Something is wrong with your pin!
							</div>
						</div>

						<div class="d-grid gap-2">
							<button tabindex="0" class="btn btn-primary blue-gradient">
								<span class="btn-text">Verifi&euml;ren</span>

								<span class="btn-loader">
									<i class="icon icofont-spinner" />
								</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable @typescript-eslint/no-unused-vars */
import ComponentLoader from '@/components/ComponentLoader.vue';
import ajax from '@/common/ajax';
import { required, minLength, maxValue } from '@vuelidate/validators';
import { isNullOrWs } from '@/common/methods';
import { useVuelidate } from '@vuelidate/core';
import router from '@/router';
import { authenticationStore } from '@/stores/authentication';
import { mapActions, mapState } from 'pinia';

export default {
	components: { ComponentLoader },
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			isLoading: false,
			code: null,
			sharedKey: null,
			authenticatorUri: null,
		};
	},
	validations: {
		code: {
			required,
			minLength: minLength(6),
			// minValue: minValue(99999),
			maxValue: maxValue(999999),
		},
	},
	computed: {},
	beforeUnmount() {
		// before component is destroyed, we are going to remove the user token from storage as it is security concern
		// they have to login again to get to this stage
		localStorage.removeItem('currentUser');
	},
	mounted() {
		this.isLoading = true;

		// Check if user is logged in
		// IF he is, that means they want to enable 2FA manually
		// IF not, then we need to append email as well

		let url = '/api/Manage/EnableAuthenticator'; // default state, enable for current user since we have token
		let data = {}; // default state - no params will be sent, only token which will be appended by ajax imediatelly

		let user = JSON.parse(localStorage.getItem('currentUser'));

		// we have to get email from state, not to save it anywhere where it can be changed
		// const email = this.$store.state.authentication.email;
		const email = this.getEmail();

		// This means we forced user to use 2FA by manually setting  "TwoFactorEnabled" to true
		if (isNullOrWs(user.token)) {
			// SO we change values then
			// Append "ByEmail" controller action
			url = url + 'ByEmail';
			// Get our user email from login screen we have just visited
			data = { email: email };
		}

		ajax
			.get(url, data)
			.then((response) => {
				// this.code = response.nesto;
				this.sharedKey = response.sharedKey;
				this.authenticatorUri = response.authenticatorUri;
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				this.isLoading = false;
				// localStorage.removeItem('currentUser');
			});
	},
	methods: {
		...mapState(authenticationStore, ['getEmail']),
		async handleSubmit(e) {
			this.v$.$touch();
			if (this.v$.$invalid) return;

			this.isLoading = true;
			// Mapping can be done like this as well: "const { twoFactorCode, password } = this;"
			const data = {
				code: this.code,
				sharedKey: this.sharedKey,
				authenticatorUri: this.authenticatorUri,
			};
			ajax
				.post('/api/Manage/EnableAuthenticator', data)
				.then((response) => {
					// console.log("EnableAuthenticator response", response);
					// router.push("/"); // Should this be ""

					// Couple of points here:
					// I need to redirect to main menu again like this so it reloads navigation, in order to populate the main menu with events and proper visibility
					// I am adding "http" in fron cause of: https://stackoverflow.com/questions/64797802/what-is-this-scheme-dont-have-a-registered-handler-error
					window.location.replace('https://' + location.host);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
					localStorage.removeItem('currentUser');
				});
			this.isLoading = false;
		},
	},
};
</script>

<style scoped>
.qrcode {
	display: inline-block;
	font-size: 0;
	margin-bottom: 0;
	position: relative;
}

.qrcode__image {
	background-color: #fff;
	border: 0.25rem solid #fff;
	border-radius: 0.25rem;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
	height: 20%;
	left: 50%;
	overflow: hidden;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 20%;
}
</style>
