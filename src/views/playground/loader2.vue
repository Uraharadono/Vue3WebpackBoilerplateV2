<template>
	<div>
		<button @click="spinIt">Spin loader for a bit</button>
		<ComponentLoader v-show="isLoading" />
	</div>
</template>

<script>
import ComponentLoader from '@/components/ComponentLoader2.vue';

export default {
	name: 'ComponentLoader2PlayGround',
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
