import Vue from 'vue';
import clickOutside from 'v-click-outside'
import VueMq from 'vue-mq';
import App from './App.vue';
import store from './store';
import router from './router';
import breakpoints from './config/breakpoints.js';

Vue.config.productionTip = false;
Vue.use(clickOutside)
Vue.use(VueMq, {
	breakpoints,
});

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app');
