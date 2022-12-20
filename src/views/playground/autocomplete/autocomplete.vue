<template>
	<div style="height: 400px">
		<div class="form-group">
			<label class="col-form-label">Client search</label>
			<Autocomplete
				v-model="selectedClient"
				:items="clientItems"
				:get-label="getClientLabel"
				:min-len="3"
				:component-item="clientTemplate"
				:input-attrs="{ name: 'input-test', id: 'v-my-autocomplete' }"
				@update-items="updateClientSuggestions"
				@item-selected="clientItemSelected"
			/>
		</div>
	</div>
</template>

<script>
import Autocomplete from '@/components/Autocomplete/Autocomplete.vue';
import ClientTemplate from './clientTemplate.vue';
import { shallowRef } from 'vue';
import ajax from '@/common/ajax';
import clientSuggestions from './client-suggestions.ts';

export default {
	name: 'AutocompletePlayGround',
	components: { Autocomplete },
	data() {
		return {
			isLoading: false,
			// Clients autocomplete
			selectedClient: null,
			clientItems: [],
			// In order to mitigate warning: "Vue received a Component which was made a reactive object.
			// This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`. "
			// Instead of using "clientTemplate: ClientTemplate," we need to create shallow copy: https://stackoverflow.com/a/67095293/4267429 and https://vuejs.org/api/reactivity-advanced.html#shallowref
			clientTemplate: shallowRef(ClientTemplate),
		};
	},
	async mounted() {
		// console.log('clientTemplate', this.clientTemplate);
		// eslint-disable-next-line prettier/prettier
		// console.log('type of clientTemplate', typeof(this.clientTemplate));
	},
	methods: {
		// Autocomplete methods
		clientItemSelected(item) {
			if (item.value == undefined) return;
			this.client = item.value;
		},
		getClientLabel(item) {
			if (item) {
				return item.name;
			}
			return '';
		},
		updateClientSuggestions(text) {
			this.clientItems = clientSuggestions.filter(
				(item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > 1
			);
			console.log(this.clientItems);
			// Usage with API calls
			//ajax
			//	.get('/api/SearchItems/GetClients', { searchParam: text })
			//	.then((response) => {
			//		console.log(response);
			//		this.clientItems = response;
			//	})
			//	.catch((e) => {
			//		console.error(e);
			//		//this.$swal(toastConfig('Error fetching data !', 'error'));
			//	});
		},

		// This method is used to pre-fill already selected client
		getClientField() {
			// Get client field into autocomplete
			ajax
				.get('/api/SearchItems/GetSelectedClientAutocompleteData', { clientId: this.client })
				.then((response) => {
					this.selectedClient = response[0];
				})
				.catch((e) => {
					console.error(e);
					//this.$swal(toastConfig('Error fetching data !', 'error'));
				});
		},
	},
};
</script>

<style></style>
