I got idea for this logic and backend one from here: https://github.com/herbat73/GenVue
<template>
	<div class="file-upload-widget">
		<div class="container">
			<div class="row">
				<div class="text-center">
					<h5>Upload Files</h5>
				</div>
				<div class="text-center">
					<div
						class="upload-here"
						@drop.stop.prevent="handleDragDropUpload"
						@dragenter.stop.prevent
						@dragleave.stop.prevent
						@dragover.stop.prevent
					>
						<p>Drag and drop or click below to select files</p>
						<div class="upload-area-padding" @click="browseForFiles" />
					</div>
				</div>
			</div>

			<!-- <div class="text-center p-5">
        <h4>
          Drop files anywhere to upload
          <br>
          or
        </h4>
        <label :for="browse" class="btn btn-lg btn-primary">Select Files</label>
      </div> -->

			<div class="row" />

			<!-- <div class="upload-progress-indicators"> -->
			<div>
				<!-- Uploading file -->
				<div v-if="progressIndicators.length > 0" class="card">
					<div class="card-header">Uploading</div>
					<div class="card-body">
						<ul class="list-group">
							<li v-for="(item, ix) in progressIndicators" :key="ix" class="list-group-item d-flex">
								<div class="col-1 list-image img-block">
									<i class="fa-solid fa-cloud-arrow-up fa-2x"></i>
								</div>
								<div class="col-10 list-info">
									<div class="list-title-block">
										<h5 class="title mb-3">
											{{ item.name }}
										</h5>
									</div>
									<template v-if="!item.error">
										<div>
											{{
												item.value < 100
													? `Uploading... (${item.value}%)`
													: 'Uploaded, Processing...'
											}}
										</div>
									</template>
									<template v-else>
										<div>{{ 'Upload error: ' + item.message }}</div>
									</template>
									<!-- Upload Complete! -->
								</div>
								<button
									class="btn btn-outline-success btn-square rounded-pill mt-3 mb-3"
									@click.prevent="cancelUpload(item)"
								>
									<span class="btn-icon">
										<i class="fa-solid fa-xmark"></i>
									</span>
								</button>
							</li>
						</ul>
					</div>
				</div>

				<!-- Upload completed files -->
				<div v-if="completedFiles.length > 0" class="card">
					<div class="card-header">Completed</div>
					<div class="card-body">
						<ul class="list-group">
							<li
								v-for="(item, ix) in completedFiles"
								:key="ix"
								class="list-group-item d-flex"
								@click="visitUrl(item.downloadPage)"
							>
								<div class="col-1 list-image img-block">
									<i class="fa-solid fa-cloud-arrow-up fa-2x"></i>
								</div>
								<div class="col-10 list-info">
									<div class="list-title-block">
										<h5 class="title mb-3">
											{{ item.name }}
										</h5>
									</div>
									Upload Complete!
								</div>
								<button class="btn btn-success btn-square rounded-pill mt-3 mb-3">
									<span class="btn-icon">
										<i class="fa-solid fa-check"></i>
									</span>
								</button>
							</li>
						</ul>
					</div>
					<div class="card-footer align-middle text-center">
						<button
							v-if="completedFiles.length > 0"
							type="button"
							class="btn btn-success w-50"
							@click.prevent="completedFiles = []"
						>
							Clear All
						</button>
					</div>
				</div>
			</div>
		</div>

		<input ref="browse" type="file" class="hidden" multiple @change="onFilesUploaded" />
	</div>
</template>
<script>
// eslint-disable @typescript-eslint/no-this-alias
// I got idea for this logic and backend one from here: https://github.com/herbat73/GenVue
import { authBearerString } from '@/common/auth-header';
import { debounce, isNullOrWs } from '@/common/methods';

export default {
	name: 'XhrFileUpload',
	props: {
		postUrl: { type: String, default: '' },
		additionalFormParams: {
			type: Array,
			default: () => {
				return [];
			},
		},
		shouldVisitUrls: { type: Boolean, default: false },
		// eslint-disable-next-line vue/require-default-prop
		parentCallback: { type: Function },
	},
	data() {
		return {
			/* schema:
            {
              value: number [0-100],
              fileRef: object [reference to file that is uploading],
              name: string [name of file],
              xhr: object [xhr object reference],
              error: bool
              message: string or null [an error message]
            }
            */
			completedFiles: [],
			progressIndicators: [],

			debouncedCallback: debounce(function (xhrResponse) {
				this.parentCallback(xhrResponse);
			}, 700),
		};
	},
	computed: {
		uploadingFiles: function () {
			return this.progressIndicators.length;
		},
		uploading: function () {
			return this.uploadingFiles > 0;
		},
	},
	methods: {
		viewMyFiles: function () {
			this.$router.push('/f');
		},
		browseForFiles: function () {
			this.$refs.browse.click();
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onFilesUploaded: function (e) {
			// console.log('onFilesUploaded')
			let browse = this.$refs.browse;
			let fileCount = browse.files.length;
			for (let i = 0; i < fileCount; i++) {
				let f = browse.files[i];
				let progress = {
					value: 0,
					fileRef: f,
					name: f.name,
				};
				this.progressIndicators.push(progress);
				this.uploadFile(f, progress);
			}
		},
		handleDragDropUpload: function (e) {
			// console.log('handleDragDropUpload')
			for (let i = 0; i < e.dataTransfer.files.length; i++) {
				let f = e.dataTransfer.files[i];
				let progress = {
					value: 0,
					fileRef: f,
					name: f.name,
					error: false,
					message: '',
				};
				this.progressIndicators.push(progress);
				// console.log('before uploadFile ' + i)
				this.uploadFile(f, progress);
			}
		},
		cancelUpload: function (progress) {
			// console.log('cancelUpload')
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			let vm = this;
			progress.xhr.abort();
			vm.progressIndicators.splice(vm.progressIndicators.indexOf(progress), 1);
		},
		uploadFile: function (file, progress) {
			// console.log('uploadFile')
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			let vm = this;
			let xhr = new XMLHttpRequest();
			progress.xhr = xhr;
			// eslint-disable-next-line no-undef
			xhr.open('POST', API_BASE_URL + this.postUrl);
			xhr.setRequestHeader('Authorization', authBearerString());
			// console.log('post ' + this.postUrl)
			xhr.onload = function () {
				if (xhr.status === 200) {
					// upload complete
					// console.log('upload complete', progress.name)
					// dequeue the uploading file
					vm.progressIndicators.splice(vm.progressIndicators.indexOf(progress), 1);
					// console.log(xhr.responseText)

					// in the end, do callback - usually it reloads the table with list of documents
					// If we have any response text, pass it into our callback function
					if (!isNullOrWs(xhr.responseText)) {
						vm.debouncedCallback(JSON.parse(xhr.responseText));
					}
					// If not, then just call it without params
					else {
						vm.debouncedCallback();
					}

					vm.completedFiles.push({
						name: progress.name,

						// downloadPage: '/#/d/' + response.fileId
						// downloadPage: response.downloadPage // get download page from server response
					});
				} else {
					// console.log('err xhr.status ' + xhr.status)
					// update progress indicator
					progress.error = true;
					// progress.message = xhr.responseText
					// reactive update
					vm.$set(progress, 'message', xhr.responseText);
				}
			};
			xhr.upload.onprogress = function (e) {
				if (e.lengthComputable) {
					progress.value = Math.floor((e.loaded / e.total) * 100);
				}
			};
			let form = new FormData();
			form.append('file', file); // File data

			// If we send additional parameters
			if (this.additionalFormParams.length > 0) {
				this.additionalFormParams.forEach((item) => {
					form.append(Object.keys(item), Object.values(item));
				});
			}
			xhr.send(form);
		},
		visitUrl: function (u) {
			if (this.shouldVisitUrls) window.open(u, '_blank');
		},
	},
};
</script>
<style scoped>
.hidden {
	display: none !important;
}

.upload-area-padding {
	border: 10px dashed #ccc;
	margin: 20px;
	padding: 80px;
	/* background: #cfc5c5; */
	cursor: pointer;
}

.upload-progress-indicators {
	text-align: center;
}

.upload-progress-bar {
	padding: 5px;
}

.upload-settings-section {
	text-align: center;
}
</style>
