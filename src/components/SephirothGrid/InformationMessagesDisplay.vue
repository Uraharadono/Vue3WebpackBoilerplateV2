<template>
	<div v-if="messages && messages.length > 0" class="alert alert-info">
		<ul>
			<li v-for="item in messages" :key="item">{{ item }}</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		messages: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
};
</script>
