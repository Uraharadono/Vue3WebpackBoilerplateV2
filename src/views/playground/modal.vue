<template>
	<div>
		<ModalComponent v-if="isModalVisible" :modal-size="'large'">
			<!-- No longer 'slots="header"', it should be now in "template" tag with "v-slot:header" or "#header" for short. -->
			<!-- https://vuejs.org/guide/components/slots.html#named-slots -->
			<template #header> This is modal header ! </template>
			<template #body>
				<h3>This is modal body !</h3>
			</template>
			<template #footer>
				<button type="button" class="btn btn-warning" @click="toggleModalVisibility">Close</button>
			</template>
		</ModalComponent>

		<button class="btn btn-primary" @click="toggleModalVisibility">Toggle modal</button>
	</div>
</template>

<script>
import ModalComponent from '@/components/ModalComponent.vue';

export default {
	name: 'ModalPlayGround',
	components: { ModalComponent },
	// emits: ['toggleModalVisibility'],
	data() {
		return {
			isModalVisible: false,
		};
	},
	methods: {
		toggleModalVisibility() {
			this.isModalVisible = !this.isModalVisible;
		},
	},
};
</script>

<style></style>
