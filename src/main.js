import Vue from 'vue';
import clickOutside from 'v-click-outside'
import VueMq from 'vue-mq';
import App from './App.vue';
import store from './store';
import router from './router';
import breakpoints from './config/breakpoints.js';
import { auth } from './utility/firebase.js';

let hasAppMounted = false;

function mountApp() {
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
}

auth.onAuthStateChanged(user => {
	if (user) {
		store.dispatch('login', user.uid);
	} else if (store.getters.isLoggedIn) {
		store.dispatch('logout');
	} else {
		store.dispatch('fetchLocalBookmarks');
	}

	if (!hasAppMounted) {
		mountApp();
		hasAppMounted = true;
	}
});
