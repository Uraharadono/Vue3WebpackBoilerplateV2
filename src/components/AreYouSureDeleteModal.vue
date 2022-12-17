<template>
	<div>
		<ModalComponent v-if="modalVisible" :modal-size="'large'">
			<!-- No longer 'slots="header"', it should be now in "template" tag with "v-slot:header" or "#header" for short. -->
			<!-- https://vuejs.org/guide/components/slots.html#named-slots -->
			<template #header> Are you sure you want to delete this item ? </template>
			<template #body>
				<!--<h3>This is modal body !</h3>-->
			</template>
			<template #footer>
				<button class="btn btn-danger" type="button" @click.prevent="executePassedMethod()">
					Yes !
				</button>
				<button type="button" class="btn btn-light" @click="hide()">Close</button>
			</template>
		</ModalComponent>
	</div>
</template>

<script>
import ModalComponent from '@/components/ModalComponent.vue';

export default {
	name: 'AreYouSureDeleteModal',
	components: { ModalComponent },
	data() {
		return {
			modalVisible: false,
			callbackFunc: null,
			callbackItem: null,
		};
	},
	methods: {
		show(callback, callbackItem) {
			this.callbackFunc = callback;
			this.callbackItem = callbackItem;
			this.modalVisible = true;
		},
		hide() {
			this.callbackFunc = null;
			this.callbackItem = null;
			this.modalVisible = false;
		},
		executePassedMethod() {
			this.callbackFunc(this.callbackItem);
		},
	},
};
</script>

<style></style>
