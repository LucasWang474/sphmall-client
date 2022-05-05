// noinspection JSUnresolvedFunction

import axios from 'axios';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const service = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000,
});

service.interceptors.request.use(
    config => {
        NProgress.start();
        return config;
    }
);

service.interceptors.response.use(
    response => {
        NProgress.done();
        return response.data;
    },
    (error) => {
        NProgress.done();
        console.log('发送 Ajax 请求失败！', error);
        return new Promise(() => undefined);
    }
);


export default service;
