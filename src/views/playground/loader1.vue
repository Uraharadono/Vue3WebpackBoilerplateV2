<template>
	<div>
		<button @click="spinIt">Spin loader for a bit</button>
		<ComponentLoader v-show="isLoading" />
	</div>
</template>

<script>
import ComponentLoader from '@/components/ComponentLoader.vue';

export default {
	name: 'ComponentLoaderPlayGround',
	components: { ComponentLoader },
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		spinIt() {
			this.isLoading = true;

			setTimeout(() => {
				this.isLoading = false;
			}, 3000);
		},
	},
};
</script>

<style></style>
