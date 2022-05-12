import {reqProductDetail} from '@/api';

const state = {
    categoryView: {},
    productAttrList: [],
    productInfo: {},
    productImageList: [],
};

const mutations = {
    SET_CATEGORY_VIEW(state, categoryView) {
        state.categoryView = categoryView;
    },
    SET_PRODUCT_ATTR_LIST(state, productAttrList) {
        state.productAttrList = productAttrList;
    },
    SET_PRODUCT_INFO(state, productInfo) {
        state.productInfo = productInfo;
    },
    SET_PRODUCT_IMAGE_LIST(state, productImageList) {
        state.productImageList = productImageList;
    },
};

const SUCCESS_CODE = 200;

const actions = {
    async initProductDetail({commit}, id) {
        const response = await reqProductDetail(id);
        if (response.code === SUCCESS_CODE) {
            const {categoryView, spuSaleAttrList, skuInfo} = response.data;
            commit('SET_CATEGORY_VIEW', categoryView);
            commit('SET_PRODUCT_ATTR_LIST', spuSaleAttrList);
            commit('SET_PRODUCT_INFO', skuInfo);

            const {skuImageList} = skuInfo;
            commit('SET_PRODUCT_IMAGE_LIST', skuImageList);
        } else {
            return Promise.reject('获取商品详情失败，状态码：' + response.code + '，错误信息：' + response.msg);
        }
    }
};


export default {
    state,
    mutations,
    actions,
};
