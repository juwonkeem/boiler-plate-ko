import axios from 'axios';
import { 
    LOGIN_USER,
    AUTH_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSumit) {
         //backend에서 가져온 모든데이터들
    const request = axios.post('/api/users/login', dataToSumit)
                         .then(response => response.data)
    return {
        //reducer로 보내야함 : reducer에서 prevState과 현재action을 조합해서 다음 state를 만들어준다
        type: LOGIN_USER,
        payload: request 
    }
}

                // get 메소드여서 body 부분 필요없다
export function auth() {
    const request = axios.get('/api/users/auth')
                         .then(response => response.data)
    return {
        type: AUTH_USER,
        payload: request 
    }
}

export function registerUser(dataToSumit) {
    const request = axios.post('/api/users/register', dataToSumit)
                         .then(response => response.data)
    return {
        type: REGISTER_USER,
        payload: request 
    }
}

export default {
    loginUser,
    auth,
    registerUser
};