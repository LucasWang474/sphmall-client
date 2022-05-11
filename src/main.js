import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/mock';

import '@/assets/css/reset.css';


Vue.config.productionTip = false;
Vue.component('TypeNav', () => import('@/components/TypeNav'));
Vue.component('MySwiper', () => import('@/components/MySwiper'));
Vue.component('Pagination', () => import('@/components/Pagination'));


new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    el: '#app',
    render: h => h(App),
    router,
    store
});
