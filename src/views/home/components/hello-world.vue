<template>
	<div class="hello">
		<!--<h1>{{ msg }}</h1>-->
		<!--eslint-disable-next-line vue/no-v-html-->
		<h1 v-html="msg"></h1>
		<h5>
			Improved version of Vue 3 boilerplate using <strong>WebPack</strong> to handle building of
			project.
		</h5>

		<div class="container">
			<hr />
			<h4>List of components/libraries/possibilities:</h4>
			<div class="row">
				<div class="col">
					<div class="alert alert-primary" role="alert">Libraries</div>
					<div class="list-group">
						<!--<a href="#" class="list-group-item list-group-item-action">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">List group item heading</h5>
						<small>3 days ago</small>
					</div>
					<p class="mb-1">Some placeholder content in a paragraph.</p>
					<small>And some small print.</small>
				</a>-->
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Typescript 4</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Prettier</h5></div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Vue Router 4</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Pinia 2</h5></div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Vuelidate</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">NProgress</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Bootstrap 5</h5>
							</div>
							<p class="mb-1">
								Using only CSS modules we need, not whole bundle and not JS stuff (we are going to
								implement those our-self)
							</p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Axios wrapper</h5>
							</div>
							<p class="mb-1">
								Wanted it to look similar to old jQuery Ajax and to support uploading files out of
								the box
							</p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Datepicker</h5>
							</div>
							<p class="mb-1"></p>
						</a>
					</div>
				</div>
				<div class="col">
					<!--<bold><h3>My custom components</h3></bold>-->
					<div class="alert alert-info" role="alert">My custom components</div>
					<div class="list-group">
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Modal component</strong></h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Xhr File Upload</strong> component</h5>
							</div>
							<p class="mb-1">
								This component supports quite the amount of history while also using my
								implementation of 'Form Post' to post data to server
							</p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Autocomplete</strong> component</h5>
							</div>
							<p class="mb-1">
								My own library, quite simple, lightweight, easy to use. Please credit if you use it.
							</p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">
									Custom <strong>Are you sure you want to delete (modal)</strong> component
								</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Loader</strong> components</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">
									Custom <strong>Auth guard</strong> component guard logic (using JWT tokens)
								</h5>
							</div>
							<p class="mb-1"></p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: { type: String, default: 'Welcome!' },
	},
});
</script>
