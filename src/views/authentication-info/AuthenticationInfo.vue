<template>
	<div class="container">
		<div class="card text-dark bg-light mb-3">
			<div class="card-header">
				Authorization/Authentication technical background and disclaimers
			</div>
			<div class="card-body">
				<h5 class="card-title">
					These components were designed to help with Authorization and Authentication scenarios
					involving <var>Entity Framework</var> entity users.
				</h5>
				<p class="card-text">
					Even though there should be no difference between using other methods, e.g. Identity
					server, as the project is setup to use <var>JWT (Json Web Tokens)</var>. You would only
					need to do a little bit of tweaking to get it to work.
				</p>
			</div>
			<div class="card-footer bg-transparent border-success">
				For this purpose and many others, I have created
				<a href="https://github.com/Uraharadono/Net7CoreApiBoilerplate"
					>.Net Core API boilerplate</a
				>
				that works in conjunction with this project.
			</div>
		</div>

		<div class="card border-success mb-3">
			<div class="card-header">Enable auth guards in this project</div>
			<div class="card-body text-success">
				<h5 class="card-title">
					In this project, Authorization and Authentication have been disabled by default, and you
					have to enable them if you want to use them.
				</h5>
				<p class="card-text">
					Since not everyone who comes into this Repo is interested into it, Route guard
					notifications have been disabled. If you want to enable them, go to the router/index.ts
					file and, at the bottom of the page (in the last router.beforeEach block), uncomment
					commented-out code.
				</p>
			</div>
		</div>
	</div>

	<div class="container">
		<hr />
		<h4>List of available auth pages:</h4>
		<div class="row">
			<div class="col">
				<div class="list-group">
					<router-link class="list-group-item list-group-item-action" to="/login">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1"><strong>Login</strong></h5>
							<i class="fa-solid fa-link text-primary"></i>
						</div>
						<p class="mb-1 text-start"></p>
					</router-link>

					<router-link to="/register" class="list-group-item list-group-item-action">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1"><strong>Register</strong></h5>
							<i class="fa-solid fa-link text-primary"></i>
						</div>
						<p class="mb-1 text-start"></p>
					</router-link>

					<div class="list-group-item list-group-item-action">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1"><strong>Confirm email</strong> (after registration)</h5>
							<i class="fa-solid fa-link text-primary"> </i>
						</div>
						<p class="mb-1 text-start">
							This functionality has been changed so it automatically returns account activation url
							(confirm email). <br />
							In simpler terms, I used url
							<code>/api/VueBoilerplate/RegisterCircumvent</code> instead of
							<code>/api/Auth/Register</code>.<br />
							<b>IF YOU USE IT IN YOUR APP; MAKE SURE YOU CHANGE </b>
							<code>authentication.ts -> register</code> method url to
							<code>/api/Auth/Register</code>
						</p>
					</div>

					<router-link to="/login-2fa" class="list-group-item list-group-item-action">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1 text-start"><strong>Login with 2 factor authentication</strong></h5>
							<i class="fa-solid fa-link text-primary"></i>
						</div>
						<p class="mb-1 text-start">
							This page will be shown after you login if you have 2 factor authentication enabled.
							In order to be able to enable 2 factor authentication see link below.
						</p>
					</router-link>

					<router-link to="/2fa-setup" class="list-group-item list-group-item-action">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1 text-start"><strong>2 factor authentication setup</strong></h5>
							<i class="fa-solid fa-link text-primary"></i>
						</div>
						<p class="mb-1 text-start">
							You can access this page after you login into the system. Otherwise there is no user
							=/= nothing to enable.
						</p>
					</router-link>

					<router-link to="/forgot-password" class="list-group-item list-group-item-action">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1 text-start"><strong>Forgot password</strong></h5>
							<i class="fa-solid fa-link text-primary"></i>
						</div>
						<p class="mb-1 text-start">Page with email input to reset your password over email.</p>
					</router-link>

					<router-link class="list-group-item list-group-item-action" to="/reset-password">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">
								<strong>Reset password</strong>
							</h5>
							<i class="fa-solid fa-link text-primary"></i>
						</div>
						<p class="mb-1 text-start">
							Page that comes after one above. You cannot access it from here because you don't have
							required query params.
						</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
