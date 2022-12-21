<!-- eslint-disable vue/no-v-html -->
<template>
	<tr>
		<td v-if="settings.displayRowNumber">
			{{ parameters.pageIndex * settings.pageSize + index + 1 }}
		</td>

		<td v-if="settings.isSelectable">
			<!--eslint-disable-next-line vue/no-mutating-props-->
			<input v-model="item.isSelected" type="checkbox" />
		</td>

		<!--eslint-disable-next-line vue/require-v-for-key, vue/no-use-v-if-with-v-for-->
		<td v-for="column in settings.columns" v-if="$parent.displayColumn(column)">
			<!-- <img v-if="column.isImage" :src="getCellValue(column)"> -->
			<img
				v-if="column.isImage"
				:src="getCellValue(column)"
				onerror="this.onerror = null; this.src='https://static.deron.nl/ArticleImages/noimage.jpg'"
				height="60"
			/>

			<!--Note here: I really don't need this "v-else-if". I could have just placed "@click" event on span below,
      but for whatever reason I get paranoid regarding "prevent" and bubbling of the click. -->
			<span
				v-else-if="column.isFileDownload"
				@click.prevent="downloadFile(column)"
				v-html="getCellValue(column)"
			/>

			<span v-else-if="column.isRouterLink">
				<router-link
					class="fake-link"
					:to="{ path: column.routerLinkPath + getFilePathValue(column) }"
				>
					{{ getCellValue(column) }}
				</router-link>
			</span>

			<div
				v-for="method in column.methods"
				v-else-if="column.isMethods"
				:key="method.buttonClass"
				class="btn-group"
				role="group"
			>
				<button
					class="btn btn-sm"
					:class="method.buttonClass"
					type="button"
					@click.prevent="method.func(item)"
				>
					<!--<font-awesome-icon :icon="['fa', method.methodIcon]" />-->
					<!--eslint-disable-next-line vue/no-v-html-->
					<i v-html="method.methodIcon"></i>
				</button>
			</div>

			<span v-else v-html="getCellValue(column)" />
		</td>
	</tr>
</template>

<script>
import ajax from '@/common/ajax';
// import { toastConfig } from '@/common/sweet-options';
import { getFileName, isNullOrWs } from '@/common/methods';

export default {
	name: 'SephirothGridRow',
	// props: ['settings', 'parameters', 'item', 'index'],
	props: {
		settings: {
			type: Object,
			default: () => {
				return {};
			},
		},
		parameters: {
			type: Object,
			default: () => {
				return {};
			},
		},
		item: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		getCellValue: function (column) {
			let result = null;

			if (typeof column.template === 'function') {
				result = column.template(this.item);
			} else {
				result = this.item[column.fieldName];
				if (column.isCheckbox === true) {
					if (result === 1 || result === true) {
						// result = '<input type="checkbox" disabled="disabled" checked="checked" />'
						// result = '<font-awesome-icon icon="check-square" />';
						result = '☒';
					} else {
						// result = '<input type="checkbox" disabled="disabled" />'
						// result = '<font-awesome-icon icon="square" />';
						result = '☐';
					}
				}
			}
			return result;
		},
		// This method is only going to be triggered if we set for this column "isFileDownload" and "filePathVariable", otherwise you are going to shoot yourself in leg
		downloadFile(item) {
			if (!item.isFileDownload) {
				return;
			} else {
				const fileServerPath = this.item[item.filePathVariable];
				ajax
					.getFile('/api/FileDownload/Download', { filePath: fileServerPath })
					.then((response) => {
						const filename = getFileName('file://' + fileServerPath);

						let fileURL = window.URL.createObjectURL(new Blob([response]));
						let fileLink = document.createElement('a');

						fileLink.href = fileURL;
						fileLink.setAttribute('download', filename);
						document.body.appendChild(fileLink);

						fileLink.click();
					})
					.catch((e) => {
						console.error(e);
						// this.$swal(toastConfig('Error downloading file !', 'error'));
					})
					.finally(() => (this.isLoading = false));
			}
		},

		// This method is used for links ONLY, to fetch value for link if we want to show "order code" but want to navigate using "orderId"
		// It fetches params of the given column to be appended to router link e.g. "/sales/520" - 520 in this case for id
		getFilePathValue: function (column) {
			let result = null;

			// Sometimes we need more than one param in the router link, and that is ussually the router link param
			// So we have it's value, that's why we are using value instead of fetching it from column
			if (!isNullOrWs(column.preRouterLinkParam))
				result = column.preRouterLinkParam + '/' + this.item[column.routerLinkParam];
			else result = this.item[column.routerLinkParam];

			// This is used to append the query params e.g. "url?clientId=123"
			if (!isNullOrWs(column.routerQueryParamName))
				result = result + '?' + column.routerQueryParamName + '=' + column.routerQueryParamValue;

			return result;
		},
	},
};
</script>
