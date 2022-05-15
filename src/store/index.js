import Vue from 'vue';
import Vuex from 'vuex';

import home from './home';
import search from './search';
import detail from './detail';
import cart from './cart';
import user from './user';
import order from './order';
import pay from './pay';

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        cart,
        user,
        order,
        pay
    }
});
