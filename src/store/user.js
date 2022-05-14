import {reqLogin, reqUserInfo, reqUserLogout} from '@/api';

const state = {
    token: localStorage.getItem('token'),
    userInfo: null,
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    RESET_TOKEN_AND_USERINFO(state) {
        state.token = null;
        state.userInfo = null;
        localStorage.removeItem('token');
    },
};

const actions = {
    async login({commit}, {phone, password}) {
        const response = await reqLogin(phone, password);
        if (response.code === 200) {
            const token = response.data.token;
            commit('SET_TOKEN', token);
            localStorage.setItem('token', token);
        } else {
            throw new Error(phone + ' 登录失败 ' + response.message);
        }
    },

    async getUserInfo({commit}) {
        const response = await reqUserInfo();
        if (response.code === 200) {
            // 以后需要更多的属性就在这里加上，不要直接存储一整个对象
            const {name, phoneNum: phone} = response.data;
            commit('SET_USERINFO', {name, phone});
        } else {
            throw new Error('获取用户信息失败');
        }
    },

    logout({commit}) {
        reqUserLogout().then(
            () => {
                commit('RESET_TOKEN_AND_USERINFO');
            },
            (error) => {
                throw new Error('退出登录失败 ' + error.message);
            }
        );
    }
};


export default {
    state,
    mutations,
    actions,
};
