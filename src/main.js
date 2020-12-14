import Vue from 'vue';

import 'normalize.css/normalize.css';

import Element from 'element-ui';
import './styles/element-variables.scss';

import '@/styles/index.scss'; // 全局CSS样式

import App from './App.vue';
import router from './router';
import store from './store';

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
