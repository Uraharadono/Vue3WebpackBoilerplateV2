import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Mikey custom directives cause I kind of hate myself
import uiAuthGuard from '@/custom-directives/ui-auth-guard.js';
// import uiAuthGuard from './custom-directives/ui-auth-guard';

// createApp(App).use(router).use(createPinia()).mount('#app');

const app = createApp(App);

// Stuff that works with Vue out of the box - mainly official stuff
app.use(router);
// app.use(Vuelidate); // this does not work anymore,
app.use(createPinia());

// Custom libs
// app.use(VueSweetalert2);

// Custom directives
app.directive('uiAuthGuard', uiAuthGuard);

app.mount('#app');
