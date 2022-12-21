<!-- eslint-disable vue/no-mutating-props -->
<template>
	<div class="row">
		<div class="col-sm">
			<!-- <button
        type="button"
        v-on:click="$parent.refresh"
        v-bind:title="this.settings.culture.refresh"
        class="btn btn-light btn-sm"
      >
        <font-awesome-icon icon="redo-alt" />
      </button>

      <button
        type="button"
        v-on:click="$parent.exportToExcel"
        v-bind:title="this.settings.culture.exportToExcel"
        class="btn btn-light btn-sm"
      >
        <font-awesome-icon icon="file-excel" />
      </button>

      <template >
        <button type="button" v-on:click="$parent.displayFirst" v-bind:title="this.settings.culture.first" class="btn btn-light btn">
          <font-awesome-icon icon="step-backward" />
        </button>

        <button type="button" v-on:click="$parent.displayPrevious" v-bind:title="this.settings.culture.previous" class="btn btn-light btn-sm">
          <font-awesome-icon icon="chevron-left" />
        </button>

        <button type="button" v-on:click="$parent.displayNext" v-bind:title="this.settings.culture.next" class="btn btn-light btn-sm">
          <font-awesome-icon icon="chevron-right" />
        </button>

        <button type="button" v-on:click="$parent.displayLast" v-bind:title="this.settings.culture.last" class="btn btn-light btn-sm">
          <font-awesome-icon icon="step-forward" />
        </button>
      </template> -->

			<div class="dataTables_wrapper">
				<div class="dataTables_paginate paging_simple_numbers">
					<!--Addition custom actions from "-->
					<div
						v-for="(action, index) in settings.additionalFooterActions"
						:key="index"
						class="paginate_button"
						:title="action.title"
						@click="action.action"
					>
						<font-awesome-icon :icon="['fa', action.icon]" />
					</div>

					<div class="paginate_button" :title="settings.culture.refresh" @click="$parent.refresh">
						<font-awesome-icon icon="redo-alt" />
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.columnManagement"
						@click="$parent.openColumnSettingsModal"
					>
						<font-awesome-icon icon="cog" />
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.exportToExcel"
						@click="$parent.exportToExcel"
					>
						<font-awesome-icon icon="file-excel" />
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.first"
						@click="$parent.displayFirst"
					>
						<font-awesome-icon icon="step-backward" />
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.previous"
						@click="$parent.displayPrevious"
					>
						<font-awesome-icon icon="chevron-left" />
					</div>

					<div class="paginate_button" :title="settings.culture.next" @click="$parent.displayNext">
						<font-awesome-icon icon="chevron-right" />
					</div>

					<div class="paginate_button" :title="settings.culture.last" @click="$parent.displayLast">
						<font-awesome-icon icon="step-forward" />
					</div>
				</div>
			</div>

			<!-- Code below is pure bootstrap way to handle pagination -->
			<!-- <nav>
        <ul class="pagination">
          <li
            class="page-item"
            v-on:click="$parent.refresh"
            v-bind:title="this.settings.culture.refresh"
          >
            <span class="page-link">
              <font-awesome-icon icon="redo-alt" />
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.exportToExcel"
            v-bind:title="this.settings.culture.exportToExcel"
          >
            <span class="page-link">
              <font-awesome-icon icon="file-excel" />
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayFirst"
            v-bind:title="this.settings.culture.first"
          >
            <span class="page-link">
              <font-awesome-icon icon="step-backward" />
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayPrevious"
            v-bind:title="this.settings.culture.previous"
          >
            <span class="page-link">
              <font-awesome-icon icon="chevron-left" />
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayNext"
            v-bind:title="this.settings.culture.last"
          >
            <span class="page-link">
              <font-awesome-icon icon="chevron-right" />
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayLast"
            v-bind:title="this.settings.culture.last"
          >
            <span class="page-link">
              <font-awesome-icon icon="step-forward" />
            </span>
          </li>
        </ul>
      </nav> -->
		</div>

		<div class="col">
			<div class="row">
				<div class="col-6">
					{{ settings.culture.pageSize }}
				</div>
				<div class="col-6">
					<select
						v-model="settings.pageSize"
						class="form-control"
						style="height: 30px; padding-top: 0px; padding-bottom: 0px"
						@change="$parent.changePageSize"
					>
						<option v-for="item in settings.pageSizes" :key="item" :value="item">
							{{ item }}
						</option>
					</select>
				</div>
			</div>
		</div>

		<div class="col">
			{{ settings.culture.page }}
			{{ parameters.pageIndex + 1 }}
			{{ settings.culture.pages }}
			{{ parameters.lastPageIndex + 1 }}
		</div>

		<div class="col">
			{{ settings.culture.recordCount }}
			{{ parameters.recordCount }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'SephirothGridFooter',
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
