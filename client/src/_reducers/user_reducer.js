import { 
    LOGIN_USER,
    AUTH_USER,
    REGISTER_USER
} from '../_actions/types';
                        //이전     , 현재
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
                return {...state, //위에있는 state를 똑같이 가져오는거/ 빈상태나타냄
                        loginSuccess: action.payload
                       } 
                break;
        case AUTH_USER:
                return {...state, 
                        userData: action.payload
                       } 
                break;
        case REGISTER_USER:
                return {...state, 
                        register: action.payload
                       } 
                break;
        default:
            return state;
    }
}
