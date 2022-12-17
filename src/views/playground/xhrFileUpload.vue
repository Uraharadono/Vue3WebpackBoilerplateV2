<template>
	<div>
		<XhrFileUpload :post-url="'/api/Documents/UploadArticleDocuments'" />
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
};
</script>

<style></style>
