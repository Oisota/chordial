import { createRouter, createWebHistory } from 'vue-router';
import Edit from './pages/Edit.vue';
import Home from './pages/Home.vue';

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'edit', path: '/edit/:uuid', component: Edit },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;