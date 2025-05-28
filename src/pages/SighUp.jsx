import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(`Account created for ${form.name}`);
    navigate('/dashboard');
  };

  const styles = {
    wrapper: {
      height: '100vh',
      width: '100vw',
      backgroundImage: `url('/images/bg1.jpg')`,  // Your background image here
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.68)', // semi-transparent white background for readability
      padding: '40px',
      borderRadius: '10px',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '1.8rem',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      boxShadow: isHovered ? '0 0 15px #1e7e34' : 'none',
    },
    link: {
      marginTop: '10px',
      textAlign: 'center',
      display: 'block',
      color: '#007bff',
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >Sign Up</button>
        </form>
        <span style={styles.link} onClick={() => navigate('/')}>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}

export default SignUp;
