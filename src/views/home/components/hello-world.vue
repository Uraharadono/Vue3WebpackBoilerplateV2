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
						<h5 class="mb-1 bold-revert">List group item heading</h5>
						<small>3 days ago</small>
					</div>
					<p class="mb-1">Some placeholder content in a paragraph.</p>
					<small>And some small print.</small>
				</a>-->
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Typescript 4</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Prettier</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Vue Router 4</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Pinia 2</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Vuelidate</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">NProgress</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Datepicker</h5>
							</div>
							<p class="mb-1"></p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Bootstrap 5</h5>
							</div>
							<p class="mb-1">
								Using only CSS modules we need, not whole bundle and not JS stuff (we are going to
								implement those our-self)
							</p>
						</a>
						<a href="#" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">Axios wrapper</h5>
							</div>
							<p class="mb-1">
								Wanted it to look similar to old jQuery Ajax and to support uploading files out of
								the box
							</p>
						</a>
						<a class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 bold-revert">FontAwesome icons</h5>
							</div>
							<p class="mb-1 text-start">
								I have not implemented FontAwesome using this way:
								https://fontawesome.com/docs/web/use-with/vue/ even tho merging and combining icons
								seems like great idea, because I want to be able to use icons dynamically ( using
								string interpolation). I have used modified version of:
								https://fontawesome.com/docs/web/setup/host-yourself/webfonts to load fonts myself.
								Instead of what is shown in tutorial, I have installed FontAwesome from npm
								(https://fontawesome.com/docs/web/setup/packages) and imported the .scss files
								myself. Budle size is 1Mb bigger, and with my experience from before, after usage of
								~20ish .svg icon, it bloats to almost same size.
							</p>
						</a>
					</div>
				</div>
				<div class="col">
					<div class="alert alert-info" role="alert">My custom components</div>
					<i>Click component to navigate to it's showroom.</i>
					<div class="list-group">
						<router-link
							class="list-group-item list-group-item-action"
							to="/playground/content-tabs"
						>
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Tabs component</strong></h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1 text-start">
								With support for both route (navigation) and component content based tab content. My
								own authoring, quite simple, lightweight, easy to use. <br />
								Page that contains Demo of other components actually uses
								<bold>route content</bold> and this one uses content.<br />
								Please credit if you use it.
							</p>
						</router-link>
						<router-link
							to="/playground/xhr-file-upload"
							class="list-group-item list-group-item-action"
						>
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Xhr File Upload</strong> component</h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1 text-start">
								This component supports quite the amount of history while also using my
								implementation of 'Form Post' to post data to server
							</p>
						</router-link>
						<router-link
							to="/playground/autocomplete"
							class="list-group-item list-group-item-action"
						>
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 text-start">Custom <strong>Autocomplete</strong> component</h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1 text-start">
								My own library, quite simple, lightweight, easy to use. Please credit if you use it.
							</p>
						</router-link>
						<router-link to="/playground/toggle" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 text-start">Custom <strong>Toggle</strong> component</h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1 text-start"></p>
						</router-link>
						<router-link class="list-group-item list-group-item-action" to="/playground/modal">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Modal component</strong></h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1"></p>
						</router-link>
						<router-link
							to="/playground/are-you-sure-modal"
							class="list-group-item list-group-item-action"
						>
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 text-start">
									Custom <strong>Are you sure you want to delete (modal)</strong> component
								</h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1"></p>
						</router-link>
						<router-link to="/playground/loader-1" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Loader 1</strong> components</h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1"></p>
						</router-link>
						<router-link to="/playground/loader-2" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1">Custom <strong>Loader 2</strong> components</h5>
								<i class="fa-solid fa-link text-primary"></i>
							</div>
							<p class="mb-1"></p>
						</router-link>
						<router-link to="/playground" class="list-group-item list-group-item-action">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 text-start">
									Custom <strong>Auth guard</strong> component guard logic (using JWT tokens)
								</h5>
							</div>
							<p class="mb-1"></p>
						</router-link>
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
