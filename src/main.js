import Vue from 'vue';
import clickOutside from 'v-click-outside'
import VueMq from 'vue-mq';
import App from './App.vue';
import store from './store';
import router from './router';
import breakpoints from './config/breakpoints.js';
import { initializeApp } from 'firebase/app';

const CONFIG = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
}

initializeApp(CONFIG);

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
