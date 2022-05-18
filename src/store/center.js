import Vue from 'vue';
import {reqOrderList} from '@/api';


const state = {
    allOrdersInfo: {},
    orderList: [],
};

const mutations = {
    SET_ALL_ORDERS_INFO(state, allOrdersInfo) {
        state.allOrdersInfo = allOrdersInfo;
    },
    SET_ORDER_LIST(state, orderList) {
        state.orderList = orderList;
    },
};

const actions = {
    async getAllOrdersInfo({commit}, {page, limit}) {
        const response = await reqOrderList(page, limit);
        console.log(response);
        if (response.code === 200) {
            commit('SET_ALL_ORDERS_INFO', response.data);
            commit('SET_ORDER_LIST', response.data.records);
        } else {
            Vue.prototype.$message.error('获取用户所有订单信息失败，请重试');
            throw new Error(response.message);
        }
    },
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
};
