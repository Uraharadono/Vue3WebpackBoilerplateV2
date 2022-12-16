<template>
	<div class="about">
		<h1>This is an about page</h1>
		<!--<ComponentLoader2 />-->
		<!--<Toggle v-model="isToggled" />-->
		<XhrFileUpload :post-url="'/api/Documents/UploadArticleDocuments'" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import { ref, onMounted } from 'vue';

// import ComponentLoader2 from '@/views/shared/ComponentLoader2.vue';
// import Toggle from '@/views/shared/Toggle.vue';
import XhrFileUpload from '@/components/XhrFileUpload.vue';

export default defineComponent({
	name: 'AboutPage',
	//components: { ComponentLoader2 },
	// components: { Toggle },
	components: { XhrFileUpload },
	data() {
		return {
			isToggled: false,
		};
	},
	// onMounted() {
	mounted() {
		console.log('tu je');
		// eslint-disable-next-line no-undef
		const absoluteUrl = API_BASE_URL;
		console.log(absoluteUrl);
	},
});
</script>
