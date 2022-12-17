<template>
	<div>
		<!--<ComponentLoader1 v-show="isLoading1" />

		<ComponentLoader2 v-show="isLoading2" />

		<Toggle v-model="isToggled" />

		<XhrFileUpload :post-url="'/api/Documents/UploadArticleDocuments'" />-->

		<h3>Tabs using navigation</h3>
		<Tabs :tabs="tabs" :is-routed="true" />
		<h3>Tabs using component content</h3>
		<Tabs :tabs="tabs2" :is-routed="false" />
	</div>
</template>

<script>
//import ComponentLoader1 from '@/components/ComponentLoader.vue';
//import ComponentLoader2 from '@/components/ComponentLoader2.vue';
//import Toggle from '@/components/Toggle.vue';
//import XhrFileUpload from '@/components/XhrFileUpload.vue';
import Tabs from '@/components/Tabs.vue';

export default {
	name: 'PlayGround',
	// components: { ComponentLoader1, ComponentLoader2, Toggle, XhrFileUpload, Tabs },
	components: { Tabs },
	data() {
		return {
			isLoading1: false,
			isLoading2: false,
			isToggled: false,

			tabs: [
				//{ title: 'Home', content: null, navComponent: '/' },
				//{ title: 'About', content: null, navComponent: '/about' },
				{ title: 'Toggle', content: null, navComponent: 'toggle' },
				{ title: 'Loader 1', content: null, navComponent: 'loader-1' },
				{ title: 'Loader 2', content: null, navComponent: 'loader-2' },
				{ title: 'Xhr File Upload', content: null, navComponent: 'xhr-file-upload' },
			],

			tabs2: [
				{
					title: 'Pictures',
					content: 'Pictures content',
				},
				{
					title: 'Music',
					content: 'Music content. Wanna see some <a href="#" data-show="3">Documents</a> content?',
				},
				{
					title: 'Videos',
					content: 'Videos content. <a href="#" data-alert="VIDEOS!!!">Alert videos</a>',
				},
				{
					title: 'Documents',
					content: 'Documents content. Wanna see some <a href="#" data-show="1">Music</a> content?',
				},
			],
		};
	},
	//mounted() {
	//},
	//methods: {
	//},
};
</script>

<style></style>
