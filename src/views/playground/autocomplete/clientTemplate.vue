<template>
	<a class="fake-link">
		<b>{{ item.id }}</b> &nbsp;
		<span>{{ item.name }}</span>
		<!-- <abbr>{{ item.description }}</abbr> -->
	</a>
</template>

<script>
export default {
	props: {
		// eslint-disable-next-line vue/require-prop-types
		item: { required: true },
	},
};
</script>
