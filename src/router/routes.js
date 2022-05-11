import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';

const routes = [
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
        name: 'detail',
        path: '/detail/:id',
        component: () => import('@/pages/Detail'),
        meta: {
            title: '商品详情',
        }
    },
    {
        // Redirect to / if no match
        path: '*',
        redirect: '/',
    }
];

export default routes;
