import {reqBanners, reqBaseCategoryList, reqFloors} from '@/api';

const state = {
    // TypeNav 所需要的数据，这是一个三维数组
    categoryList: [],

    bannerList: [],
    floorList: [],
};

const mutations = {
    SET_CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    SET_BANNER_LIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    SET_FLOOR_LIST(state, floorList) {
        state.floorList = floorList;
    },
    SET_PRODUCTS(state, products) {
        state.products = products;
    }
};

const SUCCESS_CODE = 200;

const actions = {
    async getCategoryList({commit}) {
        const response = await reqBaseCategoryList();
        // const response = await getBaseCategoryListMock();
        if (response.code === SUCCESS_CODE) {
            commit('SET_CATEGORY_LIST', response.data);
        } else {
            console.log('获取分类列表失败，状态码', response.code);
            return new Promise(() => undefined);
        }
    },
    async getBannerList({commit}) {
        const response = await reqBanners();
        if (response.code === SUCCESS_CODE) {
            commit('SET_BANNER_LIST', response.data);
        } else {
            console.log('获取轮播图列表失败，状态码', response.code);
            return new Promise(() => undefined);
        }
    },
    async getFloorList({commit}) {
        const response = await reqFloors();
        if (response.code === SUCCESS_CODE) {
            commit('SET_FLOOR_LIST', response.data);
        } else {
            console.log('获取楼层列表失败，状态码', response.code);
            return new Promise(() => undefined);
        }
    },
};


export default {
    state,
    mutations,
    actions,
};
