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
        return Promise.reject(error);
    }
);


export default mockAjax;
