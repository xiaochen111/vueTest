import Vue from 'vue';

import ElementUI from 'element-ui'; //引用饿了么ui
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import store from './vuex'; //状态管理

import './css/reset.less'; //样式重置

import app from './app.vue'; //主页面
import router from './router';//路由



import server from '../config/dev';
Vue.prototype.$server = server;



new Vue({
    el:'#app',
    router: router,
    store,
    render:(creat)=>creat(app)
})