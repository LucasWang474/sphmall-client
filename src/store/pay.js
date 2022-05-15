import {reqPayInfo} from '@/api';

const state = {
    payInfo: {},
};

const mutations = {
    SET_PAY_INFO(state, payInfo) {
        state.payInfo = payInfo;
    },
};

const actions = {
    async getPayInfo({commit}, orderID) {
        const response = await reqPayInfo(orderID);
        if (response.code === 200) {
            commit('SET_PAY_INFO', response.data);
        } else {
            alert('获取支付信息失败，请重试');
            throw new Error(response.message);
        }
    },
};

const getters = {
    totalFee(state) {
        return state.payInfo.totalFee;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
