import Vue from 'vue';
import VueRouter from 'vue-router';
import './config';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';


Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: Home,
        },
        {
            name: 'home',
            path: '/home',
            component: Home,
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                showShortFooter: true,
            }
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
            meta: {
                title: '注册',
                showShortFooter: true,
            }
        },
        {
            name: 'search',
            path: '/searchByKeyword',
            component: Search,
            meta: {
                title: '搜索'
            }
        },
        {
            // Redirect to / if no match
            path: '*',
            redirect: '/',
        }
    ]
});

router.afterEach((to) => {
    // 设置页面默认标题
    document.title = to?.meta.title || '尚品汇';
});

export default router;
