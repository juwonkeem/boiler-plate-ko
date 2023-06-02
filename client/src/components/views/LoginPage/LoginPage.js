import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [Email, setEmail] = useState("test1@kk.kk")
    const [Password, setPassword] = useState("1234567")
    
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        //이거 하지않으면 누를때마다 페이지 리프레쉬됨
        
        let body = {
            email: Email,
            password: Password
        }
        
        dispatch(loginUser(body))
        .then(response => {
             //debugger;
                    if(response.payload.loginSuccess) {
                        
                        navigate('/')
                    } else {
                       alert('Error')
                    }
                    
                })
                // .catch(error => {
                //     console.log(error);
                //     alert('Error');
                //   });


    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display : 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}


export default LoginPage