import { createApp } from 'vue';
import VueMq from 'vue3-mq';
import App from './App.vue';
import { store } from './store';
import router from './router';
import breakpoints from './config/breakpoints.js';
import { auth } from './utility/firebase.js';

let hasAppMounted = false;

function mountApp() {
	const app = createApp(App);

	app.use(store);
	app.use(router);
	app.use(VueMq, {
		breakpoints,
	});

	app.mount('body');
}

auth.onAuthStateChanged(user => {
	if (user) {
		store.dispatch('login', user.uid);
	} else if (store.getters.isLoggedIn) {
		store.dispatch('logout');
	} else {
		store.dispatch('fetchLocalState');
	}

	if (!hasAppMounted) {
		mountApp();
		hasAppMounted = true;
	}
});
