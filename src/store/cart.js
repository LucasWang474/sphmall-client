import {reqCartList, reqChangeChecked, reqDeleteCart, reqUpdateCart} from '@/api';

const state = {
    cartList: [],
};

const mutations = {
    SET_CART_LIST(state, cartList) {
        state.cartList = cartList;
    }
};

const SUCCESS_CODE = 200;

const actions = {
    async updateCartList({commit}) {
        const response = await reqCartList();
        if (response.code === SUCCESS_CODE) {
            commit('SET_CART_LIST', response.data[0]?.cartInfoList || []);
        } else {
            throw new Error('获取购物车列表失败' + response.msg);
        }
    },

    async addToCart({dispatch}, {productId, buyNum}) {
        const response = await reqUpdateCart(productId, buyNum);
        if (response.code === SUCCESS_CODE) {
            dispatch('updateCartList');
        } else {
            throw new Error('添加购物车失败' + response.msg);
        }
    },

    async toggleIsChecked({dispatch, state}, productId) {
        const target = state.cartList.find(item => item.skuId === productId);
        target.isChecked = +target.isChecked ? 0 : 1;

        const response = await reqChangeChecked(productId, target.isChecked);
        if (response.code === SUCCESS_CODE) {
            dispatch('updateCartList');
        } else {
            throw new Error('更新商品选中失败' + response.msg);
        }
    },

    async deleteProduct({dispatch}, productId) {
        const response = await reqDeleteCart(productId);
        if (response.code === SUCCESS_CODE) {
            dispatch('updateCartList');
        } else {
            throw new Error('删除商品失败 ' + response.msg);
        }
    }
};

export default {
    state,
    mutations,
    actions
};
