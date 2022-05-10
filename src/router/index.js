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
            path: '/search',
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

router.beforeEach((to, from, next) => {
    // 解决 Vue Router 数组由 2 => 1 时值会从数组变成字符串的 bug
    const props = to.query.props;
    if (typeof props === 'string') {
        to.query.props = [props];
    }

    next();
});

router.afterEach((to) => {
    // 设置页面默认标题
    document.title = to?.meta.title || '尚品汇';
});

export default router;
