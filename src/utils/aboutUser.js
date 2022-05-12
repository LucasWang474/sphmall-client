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
