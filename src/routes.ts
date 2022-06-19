import { createRouter, createWebHistory } from 'vue-router';
import Edit from './pages/Edit.vue';
import View from './pages/View.vue';
import Home from './pages/Home.vue';

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'edit', path: '/edit/:uuid', component: Edit },
	{ name: 'view', path: '/view/:uuid', component: View },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;