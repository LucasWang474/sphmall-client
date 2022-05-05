import ajax from '@/api/ajax';

const state = {
    // TypeNav 所需要的数据，这是一个三维数组
    categoryList: [],
};

const mutations = {
    SET_CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList;
    }
};

const actions = {
    async GET_CATEGORY_LIST({commit}) {
        const response = await ajax('/api/product/getBaseCategoryList');
        if (response['code'] === 200) {
            commit('SET_CATEGORY_LIST', response.data);
        }
    }
};


export default {
    namespace: true,
    state,
    mutations,
    actions,
};
