import { createRouter, createWebHistory } from 'vue-router';
import Main from './pages/Main.vue';
import AllSongs from './pages/AllSongs.vue';

const routes = [
	{ name: 'home', path: '/', component: AllSongs },
	{ name: 'edit', path: '/edit/:uuid', component: Main },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;