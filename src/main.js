import Vue from 'vue';

import 'normalize.css/normalize.css';

import Element from 'element-ui';
import './styles/element-variables.scss';

import '@/styles/index.scss'; // 全局CSS样式

import App from './App.vue';
import store from './store';
import router from './router';

import './icons'; // 引入SVG图标组件
import './permission'; // 权限控制

Vue.config.productionTip = false;

Vue.use(Element, {
	size: 'medium',
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
