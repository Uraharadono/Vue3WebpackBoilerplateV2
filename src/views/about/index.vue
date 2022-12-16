<template>
	<div class="about">
		<h1>This is an about page</h1>
		<!--<ComponentLoader2 />-->
		<Toggle v-model="isToggled" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import ComponentLoader2 from '@/views/shared/ComponentLoader2.vue';
import Toggle from '@/views/shared/Toggle.vue';

export default defineComponent({
	name: 'AboutPage',
	//components: { ComponentLoader2 },
	components: { Toggle },
	data() {
		return {
			isToggled: false,
		};
	},
});
</script>
