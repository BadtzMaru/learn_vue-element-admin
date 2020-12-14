import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* 
    require.context(directory, useSubdirectories, regExp) 接收三个参数
    @directory : 说明需要检索的目录
    @useSubdirectories : 是否检索子目录
    @regExp : 匹配文件的正则表达式,一般是文件名
*/

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// 把 './user.js' 转化成 'user', 匹配正则 /^\.\/(.*)\.\w+$/  => /^ , \. , \/ , (.*) , \. , \w+ $/
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

/* 创建store实例 */
const store = new Vuex.Store({ modules });

export default store;
