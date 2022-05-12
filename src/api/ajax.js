import axios from 'axios';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const ajax = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000,
});

ajax.interceptors.request.use(
    config => {
        NProgress.start();
        return config;
    }
);

ajax.interceptors.response.use(
    response => {
        NProgress.done();
        return response.data;
    },
    (error) => {
        NProgress.done();
        return Promise.reject(error);
    }
);


export default ajax;
