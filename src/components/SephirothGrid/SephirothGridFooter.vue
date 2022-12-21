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
        <i class="fa-solid fa-rotate-right"></i>
      </button>

      <button
        type="button"
        v-on:click="$parent.exportToExcel"
        v-bind:title="this.settings.culture.exportToExcel"
        class="btn btn-light btn-sm"
      >
        <i class="fa-solid fa-file-excel"></i>
      </button>

      <template >
        <button type="button" v-on:click="$parent.displayFirst" v-bind:title="this.settings.culture.first" class="btn btn-light btn">
          <i class="fa-solid fa-backward-step"></i>
        </button>

        <button type="button" v-on:click="$parent.displayPrevious" v-bind:title="this.settings.culture.previous" class="btn btn-light btn-sm">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <button type="button" v-on:click="$parent.displayNext" v-bind:title="this.settings.culture.next" class="btn btn-light btn-sm">
          <i class="fa-solid fa-chevron-right"></i>
        </button>

        <button type="button" v-on:click="$parent.displayLast" v-bind:title="this.settings.culture.last" class="btn btn-light btn-sm">
          <i class="fa-solid fa-forward-step"></i>
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
						<!-- In case you use vue-fontawesome-package -->
						<!--<font-awesome-icon :icon="['fa', action.icon]" />-->
						<!--eslint-disable-next-line vue/no-v-html-->
						<i v-html="action.icon"> </i>
					</div>

					<div class="paginate_button" :title="settings.culture.refresh" @click="$parent.refresh">
						<i class="fa-solid fa-rotate-right"></i>
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.columnManagement"
						@click="$parent.openColumnSettingsModal"
					>
						<i class="fa-solid fa-gear"></i>
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.exportToExcel"
						@click="$parent.exportToExcel"
					>
						<i class="fa-solid fa-file-excel"></i>
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.first"
						@click="$parent.displayFirst"
					>
						<i class="fa-solid fa-backward-step"></i>
					</div>

					<div
						class="paginate_button"
						:title="settings.culture.previous"
						@click="$parent.displayPrevious"
					>
						<i class="fa-solid fa-chevron-left"></i>
					</div>

					<div class="paginate_button" :title="settings.culture.next" @click="$parent.displayNext">
						<i class="fa-solid fa-chevron-right"></i>
					</div>

					<div class="paginate_button" :title="settings.culture.last" @click="$parent.displayLast">
						<i class="fa-solid fa-forward-step"></i>
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
              <i class="fa-solid fa-rotate-right"></i>
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.exportToExcel"
            v-bind:title="this.settings.culture.exportToExcel"
          >
            <span class="page-link">
              <i class="fa-solid fa-file-excel"></i>
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayFirst"
            v-bind:title="this.settings.culture.first"
          >
            <span class="page-link">
              <i class="fa-solid fa-backward-step"></i>
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayPrevious"
            v-bind:title="this.settings.culture.previous"
          >
            <span class="page-link">
              <i class="fa-solid fa-chevron-left"></i>
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayNext"
            v-bind:title="this.settings.culture.last"
          >
            <span class="page-link">
              <i class="fa-solid fa-chevron-right"></i>
            </span>
          </li>

          <li
            class="page-item"
            v-on:click="$parent.displayLast"
            v-bind:title="this.settings.culture.last"
          >
            <span class="page-link">
              <i class="fa-solid fa-forward-step"></i>
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
