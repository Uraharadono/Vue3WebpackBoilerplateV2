<template>
	<div>
		<h3>Tabs using navigation</h3>
		<Tabs :tabs="tabs" :is-routed="true" />
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
				{ title: 'Tabs (content)', content: null, navComponent: 'content-tabs' },
				{ title: 'Sephiroth grid', content: null, navComponent: 'sephiroth' },
			],
		};
	},
};
</script>

<style></style>
