import Vue from 'vue';
import VueRouter from 'vue-router';

import './config';
import routes from './routes';

Vue.use(VueRouter);


// noinspection JSCheckFunctionSignatures
const router = new VueRouter({
    mode: 'history',
    routes,

    scrollBehavior(to, from, savedPosition) {
        if (to.name === 'search' && from.name === 'search') {
            // 只有 search 支持保存页面跳转时保持视线位置
            return savedPosition;
        }
        return {x: 0, y: 0};
    }
});

router.beforeEach((to, from, next) => {
    if (to.name === 'search') {
        // 解决 Vue Router 数组由 2 => 1 时值会从数组变成字符串的 bug
        const {props} = to.query;
        if (typeof props === 'string') {
            to.query.props = [props];
        }
    }

    next();
});

router.afterEach((to) => {
    // 设置页面默认标题
    document.title = to?.meta.title || '尚品汇';
});

export default router;
