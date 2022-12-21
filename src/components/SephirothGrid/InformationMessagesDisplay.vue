<template>
	<div v-if="messages && messages.length > 0" class="alert alert-info">
		<ul>
			<!--eslint-disable-next-line vue/require-v-for-key-->
			<li v-for="item in messages">{{ item }}</li>
		</ul>
	</div>
</template>
<script>
export default {
	// eslint-disable-next-line vue/require-prop-types
	props: ['messages'],
};
</script>
