import Vue from 'vue';
import App from './App.vue';
import router from '@/router';


Vue.config.productionTip = false;
Vue.component('TypeNav', () => import('@/components/TypeNav'));


new Vue({
    el: '#app',
    render: h => h(App),
    router
});
