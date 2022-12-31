<template>
	<div>
		<!--<XhrFileUpload :post-url="'/api/VueBoilerplate/UploadMockDocuments'" />-->
		<XhrFileUpload
			:post-url="'/api/VueBoilerplate/UploadMockDocuments'"
			:additional-form-params="constructFileUploadParams()"
			:parent-callback="reFetchMockDocuments"
		/>
	</div>
</template>

<script>
import XhrFileUpload from '@/components/XhrFileUpload.vue';

export default {
	name: 'XhrFileUploadPlayground',
	components: { XhrFileUpload },
	data() {
		return {
			isLoading: true,
		};
	},
	methods: {
		constructFileUploadParams() {
			return [{ documentTypeId: null }];
			// Example of proper additional parameters
			// return [{ orderId: this.$route.params.orderId }, { documentTypeId: null }];
		},
		reFetchMockDocuments() {
			console.info('reFetchMockDocuments triggered');
			// this.$refs.myGrid.refresh(); // usually after downloading, some grid below needs to be refreshed
		},
	},
};
</script>

<style></style>
