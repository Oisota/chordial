import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './routes';
import db, { createIndexes } from './db';

(async () => {
	await createIndexes(db);
	const pinia = createPinia();
	const app = createApp(App);
	app.use(pinia);
	app.use(router);
	app.mount('#app');
})();
