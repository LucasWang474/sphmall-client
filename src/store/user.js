import {reqGetCaptcha} from '@/api';

const state = {
    captcha: '',
};

const mutations = {
    SET_CAPTCHA: (state, captcha) => {
        state.captcha = captcha;
    },
};

const actions = {
    async getCaptcha({commit}, phone) {
        const response = await reqGetCaptcha(phone);
        if (response.code === 200) {
            commit('SET_CAPTCHA', response.data);
        } else {
            return Promise.reject(phone + ' 获取验证码失败 ' + response.msg);
        }
    },
};


export default {
    state,
    mutations,
    actions,
};
