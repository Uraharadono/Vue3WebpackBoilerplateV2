<template>
	<div>
		<Toggle v-model="isToggled" />
	</div>
</template>

<script>
import Toggle from '@/components/Toggle.vue';

export default {
	name: 'TogglePlayground',
	components: { Toggle },
	data() {
		return {
			isToggled: true,
		};
	},
};
</script>

<style></style>
