<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AboutPage',
	mounted() {
		// eslint-disable-next-line no-undef
		const absoluteUrl = API_BASE_URL;
		console.log(absoluteUrl);
	},
});
</script>
