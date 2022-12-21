<template>
	<div class="row">
		<div class="col-12">
			<ComponentLoader v-show="parameters.gridLoading" />

			<sephiroth-modal v-if="parameters.displayColumnSettingsModal">
				<slot name="header">
					<h3 class="modal-title">
						{{ settings.culture.columns }}
					</h3>
				</slot>

				<slot name="body">
					<ul>
						<li
							v-for="column in settings.columns"
							:key="column.fieldName"
							style="cursor: pointer"
							@click="toggleColumnVisibility(column)"
						>
							<!--eslint-disable-next-line vue/no-v-html-->
							<span v-html="displayCheckbox(column)"></span>

							<!-- In case you can't use icons with string interpolation -->
							<!--Note: I have to have this a bit more complex logic for displaying "Up-Down" sorting indicatior icons
                        because I cannot use string interpolation with font-awesome-icon -.-'' -->
							<!--<font-awesome-icon v-if="displayCheckbox(column)" icon="square" />
							<font-awesome-icon v-else icon="check-square" />-->

							{{ column.title }}
						</li>
					</ul>
				</slot>

				<slot name="footer">
					<button type="button" class="btn btn-secondary" @click="closeColumnSettingsModal">
						{{ settings.culture.close }}
					</button>
				</slot>
			</sephiroth-modal>

			<!-- <display-error-messages v-if="settings.displayErrorMessages"
                              v-bind:messages="settings.errorMessages">
      </display-error-messages> -->

			<!-- <display-information-messages v-if="settings.displayInformationMessages"
                                    v-bind:messages="settings.informationMessages">
      </display-information-messages> -->

			<slot name="search" />

			<SephirothGridFooter
				v-if="settings.showTopPagination"
				:settings="settings"
				:parameters="parameters"
				class="mb-2"
			/>

			<div class="row">
				<div class="col-12 table-responsive">
					<table class="table table-bordered table-condensed table-striped table-hover">
						<thead>
							<SephirothGridHeader :settings="settings" :parameters="parameters" />
						</thead>

						<tbody>
							<SephirothGridRow
								v-for="(item, index) in settings.items"
								:key="item.id"
								:settings="settings"
								:parameters="parameters"
								:item="item"
								:index="index"
							/>
						</tbody>
					</table>
				</div>
			</div>

			<SephirothGridFooter
				v-if="settings.showBottomPagination"
				:settings="settings"
				:parameters="parameters"
			/>
		</div>
	</div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import ajax from '@/common/ajax';
import ComponentLoader from '@/components/ComponentLoader.vue';
import { isNullOrWs } from '@/common/methods';

import SephirothGridHeader from './SephirothGridHeader.vue';
import SephirothGridRow from './SephirothGridRow.vue';
import SephirothGridFooter from './SephirothGridFooter.vue';
import SephirothModal from './SephirothModal.vue';

export default {
	name: 'SephirothGrid',
	components: {
		ComponentLoader,
		SephirothGridHeader,
		SephirothGridRow,
		SephirothGridFooter,
		SephirothModal,
	},
	// props: ['settings'],
	props: {
		settings: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data: function () {
		return {
			parameters: {
				responseData: null,
				gridLoading: false,
				displayColumnSettingsModal: false,
				pageIndex: 0,
				recordCount: 0,
				lastPageIndex: 0,
				sort: {
					fieldName: null,
					direction: null,
				},
			},
			requestData: {
				pageSize: 0,
				pageIndex: 0,
				sortFieldName: null,
				sortDirection: null,
			},
		};
	},

	beforeCreate: function () {
		//console.log('Before Created!')
		// Cannot read property 'settings' of undefined
		//if (this.settings.loadFirstPageAutomatically) {
		//	this.parameters.pageIndex = 0
		//	this.getData()
		//}
	},

	created: function () {
		//console.log('Created!')

		// **************************************************
		if (this.settings.pageSizes === undefined) {
			this.settings['pageSizes'] = [10, 20, 50, 100, 200, 500, 1000];
		}
		// **************************************************

		// **************************************************
		if (this.settings.pageSize === undefined) {
			this.settings['pageSize'] = this.settings.pageSizes[0];
		}
		// **************************************************

		// **************************************************
		if (this.settings.items === undefined) {
			this.settings['items'] = null;
		}
		// **************************************************

		// **************************************************
		if (this.settings.isSuccess === undefined) {
			this.settings['isSuccess'] = false;
		} else {
			if (!(this.settings.isSuccess === true || this.settings.isSuccess === false)) {
				this.settings.isSuccess = false;
			}
		}
		// **************************************************

		// **************************************************
		if (this.settings.errorMessages === undefined) {
			this.settings['errorMessages'] = null;
		}
		// **************************************************

		// **************************************************
		if (this.settings.hiddenMessages === undefined) {
			this.settings['hiddenMessages'] = null;
		}
		// **************************************************

		// **************************************************
		if (this.settings.informationMessages === undefined) {
			this.settings['informationMessages'] = null;
		}
		// **************************************************

		// **************************************************
		if (this.settings.isSelectable === undefined) {
			this.settings['isSelectable'] = false;
		} else {
			if (!(this.settings.isSelectable === true || this.settings.isSelectable === false)) {
				this.settings.isSelectable = false;
			}
		}
		// **************************************************

		// **************************************************
		if (this.settings.displayRowNumber === undefined) {
			this.settings['displayRowNumber'] = false;
		} else {
			if (!(this.settings.displayRowNumber === true || this.settings.displayRowNumber === false)) {
				this.settings.displayRowNumber = false;
			}
		}
		// **************************************************

		// **************************************************
		if (this.settings.loadFirstPageAutomatically === undefined) {
			this.settings['loadFirstPageAutomatically'] = false;
		} else {
			if (
				!(
					this.settings.loadFirstPageAutomatically === true ||
					this.settings.loadFirstPageAutomatically === false
				)
			) {
				this.settings.loadFirstPageAutomatically = false;
			}
		}
		// **************************************************

		// **************************************************
		if (this.settings.displayErrorMessages === undefined) {
			this.settings['displayErrorMessages'] = false;
		} else {
			if (
				!(
					this.settings.displayErrorMessages === true ||
					this.settings.displayErrorMessages === false
				)
			) {
				this.settings.displayErrorMessages = false;
			}
		}
		// **************************************************

		// **************************************************
		if (this.settings.displayColumnSettings === undefined) {
			this.settings['displayColumnSettings'] = false;
		} else {
			if (
				!(
					this.settings.displayColumnSettings === true ||
					this.settings.displayColumnSettings === false
				)
			) {
				this.settings.displayColumnSettings = false;
			}
		}
		// **************************************************

		// **************************************************
		if (this.settings.displayInformationMessages === undefined) {
			this.settings['displayInformationMessages'] = false;
		} else {
			if (
				!(
					this.settings.displayInformationMessages === true ||
					this.settings.displayInformationMessages === false
				)
			) {
				this.settings.displayInformationMessages = false;
			}
		}
		// **************************************************

		// **************************************************
		for (let index = 0; index <= this.settings.columns.length - 1; index++) {
			let column = this.settings.columns[index];

			// **************************************************
			console.log(column.isHidden);
			console.log(column.isHidden === undefined);
			if (column.isHidden === undefined) {
				column['isHidden'] = false;
			} else {
				if (!(column.isHidden === true || column.isHidden === false)) {
					column.isHidden = false;
				}
			}
			// **************************************************

			// **************************************************
			if (column.isCheckbox === undefined) {
				column['isCheckbox'] = false;
			} else {
				if (!(column.isCheckbox === true || column.isCheckbox === false)) {
					column.isCheckbox = false;
				}
			}
			// **************************************************

			// **************************************************
			if (column.isSortable === undefined) {
				column['isSortable'] = false;
			} else {
				if (!(column.isSortable === true || column.isSortable === false)) {
					column.isSortable = false;
				}
			}
			// **************************************************
		}

		// **************************************************
		if (this.settings.loadFirstPageAutomatically) {
			// Should Initial load get sorted?
			// Before we do our fetch, we must look if there is specific field it should be ordered by first
			if (
				this.settings.initialFetchFieldName !== undefined &&
				this.settings.initialFetchSortDirection !== undefined
			) {
				this.parameters.sort.fieldName = this.settings.initialFetchFieldName;
				this.parameters.sort.direction = this.settings.initialFetchSortDirection;
			}

			this.parameters.pageIndex = 0;
			this.getData();
		}
	},

	methods: {
		openColumnSettingsModal: function (event) {
			this.parameters.displayColumnSettingsModal = true;
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},

		closeColumnSettingsModal: function () {
			this.parameters.displayColumnSettingsModal = false;
		},

		displayCheckbox: function (column) {
			if (column.isHidden) {
				return '<i class="fa-regular fa-square"></i>';
			} else {
				return '<i class="fa-regular fa-square-check"></i>';
			}

			// In case you can't use icons with string interpolation
			/* Note: I have to have this a bit more complex logic for displaying "Up-Down" sorting indicatior icons
          because I cannot use string interpolation with font-awesome-icon -.-'' */
			//if (column.isHidden) {
			//	// return '<font-awesome-icon icon="square" />';
			//	return true;
			//} else {
			//	// return '<font-awesome-icon icon="check-square" />';
			//	return false;
			//}
		},

		toggleColumnVisibility: function (column) {
			column.isHidden = !column.isHidden;
		},

		displayColumn: function (column) {
			return !column.isHidden;
		},

		changePageSize: function () {
			this.displayFirst();
		},

		refresh: function () {
			this.getData();
		},

		displayFirst: function () {
			this.parameters.pageIndex = 0;
			this.getData();
		},

		displayPrevious: function () {
			if (this.parameters.pageIndex > 0) {
				this.parameters.pageIndex--;
				this.getData();
			}
		},

		displayNext: function () {
			if (this.parameters.pageIndex < this.parameters.lastPageIndex) {
				this.parameters.pageIndex++;
				this.getData();
			}
		},

		displayLast: function () {
			this.parameters.pageIndex = this.parameters.lastPageIndex;
			this.getData();
		},

		getRequestData: function () {
			this.requestData.pageSize = this.settings.pageSize;
			this.requestData.pageIndex = this.parameters.pageIndex;

			this.requestData.sortFieldName = this.parameters.sort.fieldName;
			this.requestData.sortDirection = this.parameters.sort.direction;

			// Old search logic with the search boxes outside of the grid
			if (this.settings.searchItems !== undefined && this.settings.searchItems !== null) {
				let searchItems = this.settings.searchItems;
				Object.keys(searchItems).forEach((e) => {
					this.requestData[e] = searchItems[e];
				});
			}

			// New search logic with searchable headers
			const searchableColumns = this.settings.columns.filter((column) => column.isSearchable);
			if (Array.isArray(searchableColumns) || searchableColumns.length) {
				// array does not exist, is not an array, or is empty
				// ⇒ do not attempt to process array
				Object.keys(searchableColumns).forEach((e) => {
					if (!isNullOrWs(searchableColumns[e].searchText)) {
						// I made error using code below, as it will fetch columns by index, so in case we have a mix of searchable columns
						// there is possiblity it will pick one that is not searchable
						// this.requestData[this.settings.columns[e].fieldName] = searchableColumns[e].searchText;

						// this is proper way
						this.requestData[searchableColumns[e].fieldName] = searchableColumns[e].searchText;
					} else {
						// this else is here in case everything is deleted from search field, old search value will be kept and we don't want that
						// this.requestData[this.settings.columns[e].fieldName] = null; // code bad, see "if" comment
						this.requestData[searchableColumns[e].fieldName] = null;
					}
				});
			}

			// Map additional parameters if any - Warning: Object manipulation below
			if (this.settings.additionalXhrParams !== undefined)
				if (
					Array.isArray(this.settings.additionalXhrParams) ||
					this.settings.additionalXhrParams.length
				) {
					this.settings.additionalXhrParams.forEach((element) => {
						for (const [key, value] of Object.entries(element)) {
							this.requestData[key] = value;
						}
					});
				}

			return this.requestData;
		},

		getData: function () {
			this.settings.items = null;
			this.settings.isSuccess = false;

			this.settings.errorMessages = null;
			this.settings.hiddenMessages = null;
			this.settings.informationMessages = null;

			this.parameters.recordCount = 0;

			this.parameters.gridLoading = true;
			this.parameters.displayColumnSettingsModal = false;

			this.requestData.pageSize = this.settings.pageSize;
			this.requestData.pageIndex = this.parameters.pageIndex;

			this.requestData.sortFieldName = this.parameters.sort.fieldName;
			this.requestData.sortDirection = this.parameters.sort.direction;

			// Old search logic with the search boxes outside of the grid
			if (this.settings.searchItems !== undefined && this.settings.searchItems !== null) {
				let searchItems = this.settings.searchItems;
				Object.keys(searchItems).forEach((e) => {
					this.requestData[e] = searchItems[e];
				});
			}

			// New search logic with searchable headers
			const searchableColumns = this.settings.columns.filter((column) => column.isSearchable);
			if (Array.isArray(searchableColumns) || searchableColumns.length) {
				// array does not exist, is not an array, or is empty
				// ⇒ do not attempt to process array
				Object.keys(searchableColumns).forEach((e) => {
					if (!isNullOrWs(searchableColumns[e].searchText)) {
						// I made error using code below, as it will fetch columns by index, so in case we have a mix of searchable columns
						// there is possiblity it will pick one that is not searchable
						// this.requestData[this.settings.columns[e].fieldName] = searchableColumns[e].searchText;

						// this is proper way
						this.requestData[searchableColumns[e].fieldName] = searchableColumns[e].searchText;
					} else {
						// this else is here in case everything is deleted from search field, old search value will be kept and we don't want that
						// this.requestData[this.settings.columns[e].fieldName] = null; // code bad, see "if" comment
						this.requestData[searchableColumns[e].fieldName] = null;
					}
				});
			}

			// Map additional parameters if any - Warning: Object manipulation below
			if (this.settings.additionalXhrParams !== undefined)
				if (
					Array.isArray(this.settings.additionalXhrParams) ||
					this.settings.additionalXhrParams.length
				) {
					this.settings.additionalXhrParams.forEach((element) => {
						for (const [key, value] of Object.entries(element)) {
							this.requestData[key] = value;
						}
					});
				}

			ajax
				.post(this.settings.url, this.requestData)
				.then((response) => {
					// console.log(response);

					// Methods below are done using original idea, that is a bit overkil atm
					// ********************************************************************
					// this.settings.isSuccess = response.data.isSuccess;
					// this.settings.errorMessages = response.data.errorMessages;
					// this.settings.hiddenMessages = response.data.hiddenMessages;
					// this.settings.informationMessages = response.data.informationMessages;

					// if ((this.settings.hiddenMessages !== undefined) &&
					//   (this.settings.hiddenMessages !== null)) {
					//   for (let index = 0; index <= this.settings.hiddenMessages.length - 1; index++) {
					//     console.log(this.settings.hiddenMessages[index]);
					//   }
					// }

					// this.settings.isSuccess = response.isCompletedSuccessfully;

					// if (this.settings.isSuccess) {
					// code below that sets vars here
					// }

					this.settings.items = response.items;
					this.parameters.recordCount = response.count;

					// **************************************************
					for (let index = 0; index <= this.settings.items.length - 1; index++) {
						let item = this.settings.items[index];

						if (item.isSelected === undefined || item.isSelected === null) {
							item['isSelected'] = false;
						} else {
							if (item.isSelected !== true && item.isSelected !== false) {
								// eslint-disable-next-line no-undef
								column.isSelected = false;
							}
						}
					}
					// **************************************************

					// **************************************************
					this.parameters.lastPageIndex = Math.floor(
						this.parameters.recordCount / this.settings.pageSize
					);

					if (this.parameters.recordCount % this.settings.pageSize === 0) {
						this.parameters.lastPageIndex--;
					}

					if (this.parameters.lastPageIndex < 0) {
						this.parameters.lastPageIndex = 0;
					}
					// **************************************************
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.parameters.gridLoading = false;
				});
		},

		exportToExcel: function () {
			// Actual delimiter characters for CSV format
			let colDelim;
			let rowDelim = '\r\n';

			let BOM = '\uFEFF';

			// NOK
			//let csv = ''

			// OK
			//let csv = BOM

			// NOK
			//let csv = BOM + 'sep=,' + rowDelim

			// So So!
			//let csv = BOM + rowDelim + 'sep=,' + rowDelim

			// NOK
			//let csv = 'sep=,' + BOM + rowDelim

			// So So!
			//let csv = BOM + ' ' + 'sep=,' + rowDelim

			// NOK
			//let csv = BOM + '\t'

			let csv = '';

			if (this.settings.rtl) {
				csv = BOM;
				colDelim = '؛';
			} else {
				colDelim = ',';
				csv = 'sep=,' + rowDelim;
			}

			// **************************************************
			let columns = this.settings.columns;

			let headingsArray = [];
			for (let i = 0; i < columns.length; i++) {
				let column = columns[i];

				if (column.isHidden === false) {
					headingsArray.push('"' + column.title + '"');
				}
			}

			csv += headingsArray.join(colDelim) + rowDelim;
			// **************************************************

			// **************************************************
			let items = this.settings.items;

			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				let columnsArray = [];

				for (let j = 0; j < columns.length; j++) {
					let column = columns[j];
					if (column.isHidden === false) {
						columnsArray.push('"' + item[column.fieldName] + '"');
					}
				}

				csv += columnsArray.join(colDelim) + rowDelim;
			}
			// **************************************************

			// Data URI
			let csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

			//this trick will generate a temp <a /> tag
			let link = document.createElement('a');
			link.href = csvData;

			//set the visibility hidden so it will not effect on your web-layout
			link.style = 'visibility:hidden';
			link.download = 'export.csv';

			//this part will append the anchor tag and remove it after automatic click
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	},
};
</script>
