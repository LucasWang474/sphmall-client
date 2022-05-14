import Vue from 'vue';
import VueRouter from 'vue-router';

import './config';
import routes from './routes';
import store from '@/store';

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


function fixProps(to) {
    // 解决 Vue Router 数组由 2 => 1 时值会从数组变成字符串的 bug
    if (to.name === 'search') {
        const {props} = to.query;
        if (typeof props === 'string') {
            to.query.props = [props];
        }
    }
}


router.beforeEach((to, from, next) => {
    fixProps(to);

    // 普通 token 验证，不强制重新登录
    const token = store.state.user.token;
    if (token) {
        const userInfo = store.state.user.userInfo;
        if (!userInfo) {
            store.dispatch('getUserInfo').catch(() => {
                // 如果获取用户信息失败了，说明 token 已经过期了，则重置
                store.commit('RESET_TOKEN_AND_USERINFO');
            });
        }
    }

    next();
});

router.afterEach((to) => {
    // 设置页面默认标题
    document.title = to?.meta.title || '尚品汇';
});

export default router;
