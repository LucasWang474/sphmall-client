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
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            title: '支付',
            needLogin: true,
        }
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
            },
            {
                name: 'groupOrder',
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder'),
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
