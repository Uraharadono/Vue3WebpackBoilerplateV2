<template>
	<div>
		<AppLoader v-show="loading" />
		<div>
			<SephirothGrid ref="myGrid" :settings="gridSettings">
				<!-- <template slot="search">
				  <div class="form-horizontal">
					  <div class="row form-group">
						  <label for="firstName" class="col-sm-2 control-label">
							  First Name
						  </label>
						  <div class="col-sm-4">
							  <input type="Search" id="firstName" class="form-control" placeholder="" v-model="settings.searchItems.firstName" />
						  </div>
						  <label for="lastName" class="col-sm-2 control-label">
							  Last Name
						  </label>
						  <div class="col-sm-4">
							  <input type="Search" id="lastName" class="form-control" placeholder="" v-model="settings.searchItems.lastName" />
						  </div>
					  </div>
					  <div class="row">
						  <div class="col-sm-offset-2 col-sm-10">
							  <button type="button" v-on:click="search">Search</button>
						  </div>
					  </div>
				  </div>
				  <hr />
			  </template> -->
			</SephirothGrid>
		</div>
	</div>
</template>

<script>
import SephirothGrid from '@/components/SephirothGrid/SephirothGrid.vue';
import { gridLanguageEnglish } from '@/components/SephirothGrid/sephiroth-grid-lang';
// import AppLoader from '@/Views/Shared/AppLoader.vue';
import AppLoader from '@/components/ComponentLoader.vue';
import router from '@/router';

export default {
	name: 'SephirothGridPlayGround',
	components: { AppLoader, SephirothGrid },
	data() {
		return {
			loading: false,

			gridSettings: {
				culture: gridLanguageEnglish,
				url: '/api/Clients/GetClients',

				isSelectable: false,
				displayRowNumber: false,
				displayColumnSettings: true,
				loadFirstPageAutomatically: true,
				pageSize: 100,
				pageSizes: [5, 10, 20, 50, 100],
				showBottomPagination: true,
				showTopPagination: true,

				displayErrorMessages: false,
				displayInformationMessages: false,

				columns: [
					{
						// used for header
						title: 'Naam',
						isSearchable: true,
						// used for data
						fieldName: 'name',
						isSortable: true,
						isCheckbox: false,
						isHidden: false,
						// firstSortDirection: 1
						template: function (item) {
							//   let result =
							//     '<router-link to="/client-details/' +
							//     item.id +
							//     '" class="item-link">' +
							//     item.name +
							//     "</router-link>";

							let result =
								'<a href="/client-overview/' +
								item.id +
								'/details" class="item-link">' +
								item.name +
								'</a>';
							return result;
						},
					},
					{
						// used for header
						title: 'Klant soort',
						isSearchable: true,
						// used for data
						fieldName: 'clientType',
						isSortable: true,
					},
					{
						// used for header
						title: 'Adres',
						isSearchable: true,
						// used for data
						fieldName: 'address',
						isSortable: true,
					},
					{
						// used for header
						title: 'Plaats',
						isSearchable: true,
						// used for data
						fieldName: 'place',
						isSortable: true,
					},
					{
						// used for header
						title: 'Telefoon',
						isSearchable: false,
						// used for data
						fieldName: 'telephone',
						isSortable: false,
					},
					{
						fieldName: 'email',
						title: 'Email',
						isSortable: true,
						// isSearchable: true,
					},
				],

				// These are used if we want to have search functionalities outside the grid (above it) that corespond to the 'slot="search"' in SephirothGrid.vue
				// Example above is done for firstName and lastName
				searchItems: {
					// 	lastName: null,
					// 	firstName: null,
				},

				additionalFooterActions: [
					{
						title: 'Add client',
						icon: '<i class="fa-solid fa-plus"></i>',
						// path: "add-client"
						action: () => {
							router.push({
								name: 'New Client',
								// params: { quotationId: this.id }
							});
						},
					},
				],
			},
		};
	},
};
</script>
