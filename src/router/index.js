import Vue from 'vue';
import VueRouter from 'vue-router';

import './config';
import routes from './routes';

Vue.use(VueRouter);


const toTopRoutes = [
    'detail',
    'addCartSuccess',
];

// noinspection JSCheckFunctionSignatures
const router = new VueRouter({
    mode: 'history',
    routes,

    scrollBehavior(to, from, savedPosition) {
        if (toTopRoutes.includes(to.name)) {
            return {x: 0, y: 0};
        }
        return savedPosition;
    }
});

router.beforeEach((to, from, next) => {
    // 解决 Vue Router 数组由 2 => 1 时值会从数组变成字符串的 bug
    const {props} = to.query;
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
