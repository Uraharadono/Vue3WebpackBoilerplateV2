<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
	<tr>
		<th v-if="settings.displayRowNumber">
			{{ settings.culture.rowNumberTitle }}
			<!-- Note to self: I moved this button to the bottom of the grid, because it was breaking my whole grid (side scroll) -->
			<!-- <font-awesome-icon v-if="settings.displayColumnSettings"
                         icon="cog"
                         @click="$parent.openColumnSettingsModal" /> -->
		</th>

		<th v-if="settings.isSelectable">
			{{ settings.culture.select }}
			<!-- Note to self: I moved this button to the bottom of the grid, because it was breaking my whole grid (side scroll) -->
			<!-- <font-awesome-icon v-if="settings.displayColumnSettings"
                         icon="cog"
                         @click="$parent.openColumnSettingsModal" /> -->
		</th>

		<SephirothGridColumn
			v-for="column in settings.columns"
			v-if="$parent.displayColumn(column)"
			:key="column.fieldName"
			:settings="settings"
			:parameters="parameters"
			:column="column"
		/>
	</tr>
</template>

<script>
import SephirothGridColumn from './SepirothGridColumn';

export default {
	name: 'SephirothGridHeader',
	components: { SephirothGridColumn },
	// props: ['settings', 'parameters'],
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
	},
};
</script>
