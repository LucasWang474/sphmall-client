import {reqLogin} from '@/api';

const state = {
    phone: '',
    token: localStorage.getItem('token'),
};

const mutations = {
    SET_PHONE: (state, phone) => {
        state.phone = phone;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
};

const actions = {
    async login({commit}, {phone, password}) {
        const response = await reqLogin(phone, password);
        if (response.code === 200) {
            const token = response.data.token;
            commit('SET_TOKEN', token);
            localStorage.setItem('token', token);

            commit('SET_PHONE', phone);
        } else {
            throw new Error(phone + ' 登录失败 ' + response.message);
        }
    }
};


export default {
    state,
    mutations,
    actions,
};
