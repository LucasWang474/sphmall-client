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
        // Redirect to / if no match
        path: '*',
        redirect: '/',
    }
];

export default routes;
