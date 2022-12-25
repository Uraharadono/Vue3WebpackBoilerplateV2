/* EXPLANATION TO MYSELF
 * Update, we actually can (I asked here: https://github.com/avil13/vue-sweetalert2/pull/131), but leaving it here for future purposes.
 * ____________________________________________________________________________________________________________________________________
 * This was created beacuse we cannot call "this.$swal" from our state, actions or mutations.
 * Actually we can, as seen here: https://stackoverflow.com/q/57448027/4267429
 * Just in our case we would call it like "this._vm.$swal('Hello Vue world!!!');".
 * .
 * .
 * HOWEVER! THIS IS ANTI PATTERN!!!!
 *
 * I tried to use something like this: https://forum.vuejs.org/t/giving-feedback-from-vuex-async-actions/45200/5
 * but unfortunately I could not benefit from it as I want total control if something has few different outcomes.
 *
 *
 * So what I did, with a little help of idea from https://stackoverflow.com/a/61562512/4267429
 * 1.) I created a store for sweet toast (this is only using toast config for Sweet Alert) called "sweet-toast.js"
 * 2.) Registered it in our Vuex store
 * 3.) In our App.vue file I created a watch function that watches over the state of this "sweet-toast.js" file.
 * 4.) If state changes then watch will "notice it" and we can do our custom logic.
 * 5.) Since I am watching "ticks" property (I needed something else, because message can stay the same, and still I would want to show it)
 *     I have to fetch current state of our toast file. That's why I have getter there.
 * 6.) With a bit of magic, everything works now and can be used in my state machine like so "dispatch('sweetToast/success', "RADI KURVE!", { root: true });"
 *
 * NOTE: Keep in mind we need root prop as per https://vuex.vuejs.org/guide/modules.html#namespacing
 */

const generalErrorMsg = "Er is een fout opgetreden. Probeer het opnieuw.";

export const sweetToast = {
  namespaced: true,
  getters: {
    // currentToast =>
    currentToast: (state) => state,
  },
  state: {
    // variables user can control
    icon: "",
    title: "",

    // variable that is being "watched" in our App.vue
    ticks: null,
    // variable that stores global "this.$swal" so we can call functions from it
    globalSwal: null,

    // default values to make this look like actual toaster
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: function(toast) {
      const self = this;
      toast.addEventListener("mouseenter", self.globalSwal.stopTimer);
      toast.addEventListener("mouseleave", self.globalSwal.resumeTimer);      
    },
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    warning({ commit }, message) {
      commit("warning", message);
    },
    info({ commit }, message) {
      commit("info", message);
    },
    question({ commit }, message) {
      commit("question", message);
    },
    // Util actions
    setGlobalSwal({ commit }, swal) {
      commit("setGlobalSwal", swal);
    },
    clear({ commit }) {
      commit("clear");
    },
  },
  mutations: {
    success(state, message) {
      state.title = message;
      state.icon = "success";
      state.ticks = new Date().getTime();
    },
    error(state, message) {
      state.title = message;
      state.icon = "error";
      state.ticks = new Date().getTime();
    },
    warning(state, message) {
      state.title = message;
      state.icon = "warning";
      state.ticks = new Date().getTime();
    },
    info(state, message) {
      state.title = message;
      state.icon = "info";
      state.ticks = new Date().getTime();
    },
    question(state, message) {
      state.title = message;
      state.icon = "question";
      state.ticks = new Date().getTime();
    },
    // Util mutations
    setGlobalSwal(state, swal) {
      state.globalSwal = swal;
    },
    clear(state) {
      state.title = null;
      state.icon = null;
    },
  },
};
