import Vue from 'vue';
import Router from 'vue-router';
import store from './vuex'; //全局状态管理



// 导入组件模块
import login from './components/tpl/login.vue';
import register from './components/tpl/register.vue';
import index from './components/index/index.vue';//首页
import fcl from './components/fcl/index.vue';//运价
import demo from './components/tpl/demo.vue';


Vue.use(Router); //在vue中实用路由



const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: index,
        meta:{title:'首页'}
    },
    {
        path: '/fcl',
        component: fcl,
        meta: { title: '运价', requireAuth: true }, //可根据requireAuth的值  做对应的权限判断
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/demo',
        component: demo
    }
];

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {  //在路由跳转之前做的事 to：到哪个路由  from：从哪个路由过来  next:function 一定要调用
    // console.log(to.meta)
    console.log(store.state.anth)  //全局状态管理anth是否已经登录
    if (to.meta.title){
        document.title = to.meta.title; //设置每页的title
    }else{
        document.title = "页面";
    }

    if (!store.state.anth && to.meta.requireAuth){
        console.log('请登录')
        // next('/');
        // return;
    }else{
        console.log('已登录')
    }
    next()
})

export default router;