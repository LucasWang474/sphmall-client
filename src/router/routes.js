import store from '@/store';
import Vue from 'vue';


const routes = [
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
        },
        beforeEnter(to, from, next) {
            store.dispatch('getUserInfo')
                .then(() => {
                    Vue.prototype.$message.error('您已经登录，请勿重复登录');
                    next('/');
                })
                .catch(() => {
                    next();
                });
        },
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
        name: 'detail',
        path: '/detail/:id',
        component: () => import('@/pages/Detail'),
        meta: {
            title: '商品详情',
        }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            title: '加入购物车成功',
        },
    },
    {
        name: 'shopCart',
        path: '/shopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            title: '我的购物车',
        }
    },
    {
        name: 'order',
        path: '/order',
        component: () => import('@/pages/Order'),
        meta: {
            title: '我的订单',
            needLogin: true,
        },
        beforeEnter(to, from, next) {
            // 只有从 shopCart 才能进入 order
            console.log(from);
            if (from.name === 'shopCart') {
                next();
            } else {
                next('/');
            }
        },
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            title: '支付',
            needLogin: true,
        },
        beforeEnter(to, from, next) {
            // 只有从 order 才能进入 pay
            if (from.name === 'order') {
                next();
            } else {
                next('/');
            }
        },
    },
    {
        name: 'paySuccess',
        path: '/paySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            title: '支付成功',
            needLogin: true,
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            title: '我的订单列表',
            needLogin: true,
        },
        children: [
            {
                name: 'myOrder',
                path: 'myOrder',
                component: () => import('@/pages/Center/MyOrder'),
                meta: {
                    needLogin: true,
                }
            },
            {
                name: 'groupOrder',
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder'),
                meta: {
                    needLogin: true,
                }
            },
        ],
        redirect: {
            name: 'myOrder',
        }
    },
    {
        // Redirect to / if no match
        path: '*',
        redirect: '/',
    }
];

export default routes;
