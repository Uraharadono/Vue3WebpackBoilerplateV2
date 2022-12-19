<template>
	<div class="home">
		<!--<img alt="Vue logo" src="./images/logo.png" />-->
		<HelloWorld :msg="message" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/hello-world.vue';

export default defineComponent({
	name: 'HomePage',
	components: { HelloWorld },
	data() {
		return {
			message:
				'Welcome to Vue3 Boilerplate WebPack V2 by <a href="https://github.com/Uraharadono/Vue3WebpackBoilerplateV2">Uraharadono</a>',
		};
	},
});
</script>
