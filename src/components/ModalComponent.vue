<template>
	<div
		id="modal-9"
		class="modal fade show"
		tabindex="-1"
		role="dialog"
		style="display: block"
		aria-modal="true"
	>
		<div
			class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
			:class="modalSizeComputed"
		>
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
	name: 'ModalComponent',
	// props: ['modalSize'],
	props: {
		modalSize: { type: String, default: '' },
	},
	data: function () {
		return {
			showModal: true,
		};
	},
	computed: {
		modalSizeComputed() {
			if (!this.modalSize)
				// falsy
				return '';

			if (this.modalSize == 'small') return 'modal-sm';

			if (this.modalSize == 'default') return '';

			if (this.modalSize == 'large') return 'modal-lg';

			if (this.modalSize == 'extra-large') return 'modal-xl';

			return '';
		},
	},
	methods: {
		openModal() {
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		submitAndClose() {},
		getSizeClass() {
			const size = this.modalSize;

			// Bootstrap classes for modal
			// small
			// default
			// large
			// extra-large
			if (size == 'small') return 'modal-sm';

			if (size == 'default') return '';

			if (size == 'large') return 'modal-lg';

			if (size == 'extra-large') return 'modal-xl';
		},
	},
};
</script>
