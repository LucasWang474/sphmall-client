import {reqAddressList, reqOrderInfo} from '@/api';

const state = {
    orderInfo: {},
    addressList: [],
};

const mutations = {
    SET_ORDER_INFO: (state, orderInfo) => {
        state.orderInfo = orderInfo;
    },
    SET_ADDRESS_LIST: (state, addressList) => {
        state.addressList = addressList;
    },
};

const actions = {
    async getOrderInfo({commit}) {
        const response = await reqOrderInfo();
        if (response.code === 200) {
            commit('SET_ORDER_INFO', response.data);
        } else {
            alert('获取订单信息失败，请重试');
            throw new Error(response.message);
        }
    },

    async getAddressList({commit}) {
        const response = await reqAddressList();
        if (response.code === 200) {
            console.log(response);
            console.log(response.data);
            commit('SET_ADDRESS_LIST', response.data);
        } else {
            alert('获取地址列表失败，请重试');
            throw new Error(response.message);
        }
    },
};

const getters = {
    detailArrayList(state) {
        return state.orderInfo.detailArrayList;
    },
    originalTotalAmount(state) {
        return state.orderInfo.originalTotalAmount;
    },
    totalAmount(state) {
        return state.orderInfo.totalAmount;
    },
    totalNum(state) {
        return state.orderInfo.totalNum;
    },
    tradeNo(state) {
        return state.orderInfo.tradeNo;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
