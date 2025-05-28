import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    setName('');
    setPassword('');
    setErrorMsg('');
  };

  const handleLoginSubmit = () => {
    // Simple validation example
    if (!name.trim() || !password.trim()) {
      setErrorMsg('Please enter both name and password.');
      return;
    }

    // TODO: Add real login/authentication logic here

    // If login successful, navigate to dashboard
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
            <button className="button" onClick={openLoginPopup}>Login</button>
            <button className="button signup" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
        <div className="rightPanel">
          <img src="/images/login.jpg" alt="Login Illustration" />
        </div>
      </div>

      {showLoginPopup && (
        <div className="modalOverlay" onClick={closeLoginPopup}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: 10, marginBottom: 15, borderRadius: 4, border: '1px solid #ccc' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 10, marginBottom: 15, borderRadius: 4, border: '1px solid #ccc' }}
            />
            {errorMsg && <p style={{ color: 'red', marginBottom: 15 }}>{errorMsg}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleLoginSubmit}
                style={{
                  padding: 10,
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  width: '48%',
                }}
              >
                Submit
              </button>
              <button
                onClick={closeLoginPopup}
                style={{
                  padding: 10,
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  width: '48%',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
