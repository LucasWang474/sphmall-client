import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/mock';
import '@/ui/element';
import * as API from '@/api';

import '@/assets/css/reset.css';


Vue.config.productionTip = false;
Vue.component('TypeNav', () => import('@/components/TypeNav'));
Vue.component('MySwiper', () => import('@/components/MySwiper'));
Vue.component('Pagination', () => import('@/components/Pagination'));
Vue.component('AddCartSuccess', () => import('@/pages/AddCartSuccess'));


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
