<template>
	<div>
		<AreYouSureModal ref="deleteModalConfirmation" />
		<button
			class="btn btn-danger btn-sm"
			type="button"
			@click.prevent="deleteInvoicePrompt(invoice)"
		>
			Click me to delete "invoice"
		</button>
	</div>
</template>

<script>
import AreYouSureModal from '@/components/AreYouSureDeleteModal.vue';

export default {
	name: 'AreYouSureDeleteModalPlayGround',
	components: { AreYouSureModal },
	data() {
		return {
			isModalVisible: false,
			invoice: { invoiceId: 12 },
		};
	},
	methods: {
		deleteInvoicePrompt(item) {
			// this will execute method immediatelly :(
			// this.$refs.deleteModalConfirmation.show(this.deleteAddress(item));
			this.$refs.deleteModalConfirmation.show(this.deleteInvoice, item);
		},
		deleteInvoice(item) {
			console.log('Item deleted', item);
			this.$refs.deleteModalConfirmation.hide();

			// This below is example of using the ajax to do a proper delete call for item
			// console.log(item);
			// const data = { invoiceId: item.invoiceId };
			// ajax
			// 	.del('/api/Invoicing/DeleteInvoice', data)
			// 	.then((response) => {
			//      console.log("Invoice deleted succesufully !")
			// 		this.$refs.deleteModalConfirmation.hide();
			// 	})
			// 	.catch((e) => {
			// 		console.error(e);
			// 	});
		},
	},
};
</script>

<style></style>
