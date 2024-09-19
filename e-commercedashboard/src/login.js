import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 import './style.css'; // Import the classic CSS styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password || password.length < 8 || !passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters and include at least one special character (!@#$%^&*)';
    }

    return newErrors;
  };

  const collectData = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    let result = await fetch(`http://localhost:8000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    result = await result.json();
    if (result) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } else {
      alert('Register first or enter correct credentials.');
      navigate('/regist');
    }
  };

  const goToRegister = () => {
    navigate('/regist');
  };

  return (
    <div className="lApp">
      <h1>Alert: Register Before Login</h1>
      <Form className="Form">
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </Form.Group>
      </Form>
      <Button className="butt" variant="dark" onClick={collectData}>
        Login
      </Button>
      <Button className="butt" variant="dark" onClick={goToRegister}>
        Register
      </Button>
    </div>
  );
};

export default Login;
