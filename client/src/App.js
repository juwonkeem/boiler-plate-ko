import React from "react";
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { auth } from './_actions/user_action';
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  
  const dispatch = useDispatch();

  React.useEffect(() => {
      // dispatch(auth());
      // console.log(dispatch(auth()))
      dispatch(auth()).then(response => {
        // 비동기 작업이 완료된 후에 실행되는 코드
        console.log(response.payload.isAuth); // true를 출력
        console.log(response.payload.email); // 'test1@kk.kk'를 출력
        console.log(response.payload)
      });
     }, [dispatch]);
    
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>  
    );
  
}

export default App;
