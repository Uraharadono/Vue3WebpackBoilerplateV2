// I cannot use "import swal from 'swal' " as that guy said on https://github.com/avil13/vue-sweetalert2/pull/131.
// But I found here https://www.npmjs.com/package/sweetalert2
// That I can just use full path to both js and css files

import swal from 'sweetalert2/dist/sweetalert2.js';

export const toastConfig = function(message, icon) {
  return {
    // variables user can control
    icon: icon,
    title: message,

    // default values to make this look like actual toaster
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: function(toast) {
      const self = this;
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    }
  };
};

export default {
  toastConfig: toastConfig
};
