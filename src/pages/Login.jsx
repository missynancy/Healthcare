import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="wrapper">
      <div className="container2">
        <div className="leftPanel">
          <h1 className="title">Welcome to ChronicCare</h1>
          <p className="description">
            ChronicCare helps patients manage long-term health conditions by tracking symptoms,
            medications, and doctor visits — all in one place. Stay informed, stay healthy.
          </p>
          <div className="buttonGroup">
            <button className="button" onClick={handleLogin}>Login</button>
            <button className="button signup" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
        <div className="rightPanel">
          <img src="/images/login.jpg" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
