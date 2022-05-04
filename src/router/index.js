import Vue from 'vue';
import VueRouter from 'vue-router';
import './config';

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: () => import('@/pages/Home'),
        },
        {
            name: 'home',
            path: '/home',
            component: () => import('@/pages/Home'),
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: {
                title: '登录',
                showShortFooter: true,
            }
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: {
                title: '注册',
                showShortFooter: true,
            }
        },
        {
            name: 'search',
            path: '/search',
            component: () => import('@/pages/Search'),
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
