<!-- eslint-disable vue/multi-word-component-names -->
<!-- If this fails take a look at: https://dev.to/vaibhavkhulbe/create-a-custom-toggle-component-in-vue-js-1ipi -->

<template>
	<!-- This syntax below works, but it's with buttons, and it looks kind of gross, not gonna lie. -->
	<!-- <div>
    <button v-if="value" class="btn btn-outline-light btn-square" @click="toggle()">
      <span class="btn-icon">
        <i class="fa-solid fa-sort-down" /></i>
      </span>
    </button>
    <button v-else class="btn btn-outline-light btn-square" @click="toggle()">
      <span class="btn-icon">
        <i class="fa-solid fa-sort-up" /></i>
      </span>
    </button>
  </div> -->

	<div>
		<i v-if="toggleState" class="fa-solid fa-sort-down" @click="toggle()"> </i>
		<i v-else class="fa-solid fa-caret-right" @click="toggle()"> </i>
	</div>
</template>

<script>
export default {
	// props: ['value'],
	props: {
		toggled: { type: Boolean, default: false },
	},
	data() {
		return { toggleState: this.toggled };
	},
	methods: {
		toggle() {
			this.toggleState = !this.toggleState;
			// eslint-disable-next-line vue/require-explicit-emits
			this.$emit('toggle', this.toggleState);
		},
	},
};
</script>
