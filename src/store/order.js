import {reqAddressList, reqOrderInfo, reqSubmitOrder} from '@/api';

const state = {
    orderInfo: {},
    addressList: [],
    orderID: undefined,
};

const mutations = {
    SET_ORDER_INFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
    SET_ADDRESS_LIST(state, addressList) {
        state.addressList = addressList;
    },
    SET_ORDER_ID(state, orderID) {
        state.orderID = orderID;
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
            commit('SET_ADDRESS_LIST', response.data);
        } else {
            alert('获取地址列表失败，请重试');
            throw new Error(response.message);
        }
    },

    async submitOrder({commit}, data) {
        const response = await reqSubmitOrder(data);
        if (response.code === 200) {
            commit('SET_ORDER_ID', response.data);
            alert('提交订单成功');
        } else {
            alert('提交订单失败，请重试');
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
