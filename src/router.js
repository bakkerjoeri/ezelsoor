import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Tagged from './components/Tagged';
import Archive from './components/Archive';
import ToRead from './components/ToRead';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/favorites', component: Favorites },
    { path: '/tag/:tagName', name: 'tag', component: Tagged, props: true },
    { path: '/archive', component: Archive },
    { path: '/toread', component: ToRead },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;