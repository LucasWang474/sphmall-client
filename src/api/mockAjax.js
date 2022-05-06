import axios from 'axios';


const mockAjax = axios.create({
    // baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000,
});


mockAjax.interceptors.response.use(
    response => {
        return response.data;
    },
    (error) => {
        console.log('发送 Ajax 请求失败！', error);

        // 统一处理错误，直接终止 Promise 链
        return new Promise(() => undefined);
    }
);


export default mockAjax;
