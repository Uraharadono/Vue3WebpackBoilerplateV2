<template>
	<div
		id="modal-9"
		class="modal fade show"
		tabindex="-1"
		role="dialog"
		style="display: block; padding-right: 16px"
		aria-modal="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title m-0">
						<slot name="header" />
					</h5>
				</div>
				<div class="modal-body">
					<slot name="body" />
				</div>
				<div class="modal-footer">
					<slot name="footer" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SephirothModal',
	data: function () {
		return {
			showModal: true,
		};
	},
	methods: {
		openModal() {
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		// submitAndClose() {},
	},
};
</script>
