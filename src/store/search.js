import {reqSearchResults} from '@/api';


const state = {
    searchResults: [],
};

const mutations = {
    SET_SEARCH_RESULTS(state, searchResults) {
        state.searchResults = searchResults;
    }
};

const SUCCESS_CODE = 200;

const actions = {
    async getSearchResults({commit}, searchParams) {
        const response = await reqSearchResults(searchParams);
        if (response.code === SUCCESS_CODE) {
            commit('SET_SEARCH_RESULTS', response.data);
        } else {
            return Promise.reject('获取搜索结果失败，状态码：' + response.code);
        }
    }
};


export default {
    state,
    mutations,
    actions,
};
