import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const withAuth = (SpecificComponent, option, adminRoute = null) => {
  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login');
          }
        } else {
          // 로그인한 상태
          // 1. admin
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            if (option === false) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} />;
  };

  return AuthenticationCheck;
};

export default withAuth;
