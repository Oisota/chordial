import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import pinia from './store'
import db, { createIndexes } from './db';

(async () => {
	await createIndexes(db);
	const app = createApp(App);
	app.use(pinia);
	app.use(router);
	app.mount('#app');
})();
