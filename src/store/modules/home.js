import {getBanners, getBaseCategoryList, getFloors} from '@/api';

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
    }
};

const actions = {
    async getCategoryList({commit}) {
        const response = await getBaseCategoryList();
        if (response.code === 200) {
            commit('SET_CATEGORY_LIST', response.data);
        } else {
            console.log('获取分类列表失败', response);
        }
    },
    async getBannerList({commit}) {
        const response = await getBanners();
        if (response.code === 200) {
            commit('SET_BANNER_LIST', response.data);
        } else {
            console.log('获取轮播图列表失败', response);
        }
    },
    async getFloorList({commit}) {
        const response = await getFloors();
        if (response.code === 200) {
            commit('SET_FLOOR_LIST', response.data);
        } else {
            console.log('获取楼层列表失败', response);
        }
    }
};


export default {
    namespace: true,
    state,
    mutations,
    actions,
};
