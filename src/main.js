import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueLazyload from 'vue-lazyload';
import loading from '@/assets/images/loading.gif';
import '@/mock';
import '@/ui/element';
import * as API from '@/api';

import '@/assets/css/reset.css';


Vue.config.productionTip = false;

Vue.use(VueLazyload, {loading});

// 全局注册公共组件
Vue.component('TypeNav', () => import('@/components/TypeNav'));
Vue.component('MySwiper', () => import('@/components/MySwiper'));
Vue.component('Pagination', () => import('@/components/Pagination'));


new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    el: '#app',
    render: h => h(App),
    router,
    store
});
