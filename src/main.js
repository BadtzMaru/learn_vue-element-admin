import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';

Vue.config.productionTip = false;

/* 开起 mockjs */
if (process.env.NODE_ENV == 'production') {
	const { mockXHR } = require('../mock');
	mockXHR();
}

Vue.use(Element, {
	size: 'medium',
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
