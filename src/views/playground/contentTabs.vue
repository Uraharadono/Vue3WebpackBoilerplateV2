<template>
	<div>
		<h3>Tabs using component content</h3>
		<Tabs :tabs="tabs2" :is-routed="false" />
	</div>
</template>

<script>
import Tabs from '@/components/Tabs.vue';

export default {
	name: 'ContentTabsPlayGround',
	components: { Tabs },
	data() {
		return {
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
