<template>
	<div>
		<h3>Tabs using navigation</h3>
		<Tabs :tabs="tabs" :is-routed="true" />
		<h3>Tabs using component content</h3>
		<Tabs :tabs="tabs2" :is-routed="false" />
	</div>
</template>

<script>
import Tabs from '@/components/Tabs.vue';

export default {
	name: 'PlayGround',
	components: { Tabs },
	data() {
		return {
			tabs: [
				{ title: 'Toggle', content: null, navComponent: 'toggle' },
				{ title: 'Loader 1', content: null, navComponent: 'loader-1' },
				{ title: 'Loader 2', content: null, navComponent: 'loader-2' },
				{ title: 'Xhr File Upload', content: null, navComponent: 'xhr-file-upload' },
				{ title: 'Modal', content: null, navComponent: 'modal' },
				{ title: 'Are You Sure Modal', content: null, navComponent: 'are-you-sure-modal' },
				{ title: 'Autocomplete', content: null, navComponent: 'autocomplete' },
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
};
</script>

<style></style>
