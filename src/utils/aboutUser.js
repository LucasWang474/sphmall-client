import {v4 as uuidv4} from 'uuid';


export function getUserTempId() {
    let userTempId = localStorage.getItem('userTempId');
    if (!userTempId) {
        // generate userTempId using UUID
        userTempId = uuidv4();
        localStorage.setItem('userTempId', userTempId);
    }
    return userTempId;
}


// 中国大陆 11 位数字手机号码
export const phoneReg = /^1\d{10}$/;

// 长度至少为 9 位，必须包括且只能包括大小写字母和数字
export const passwordReg = /^(?=.*[a-zA-Z\d])(?=.*\d)[a-zA-Z\d]{9,}$/;
