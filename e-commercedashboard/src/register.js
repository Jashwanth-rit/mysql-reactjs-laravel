import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import the classic CSS styles

const Regist = () => {
  const [firstname, setfname] = useState('');
  const [lastname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
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

    if (!firstname) {
      newErrors.firstname = 'First name is required';
    }
    if (!lastname) {
      newErrors.lastname = 'Last name is required';
    }
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 8 || !passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters and include at least one special character (!@#$%^&*)';
    }

    return newErrors;
  };

  const collectdata = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    let result = await fetch('http://localhost:8000/api/regist', {
      method: 'post',
      body: JSON.stringify({ firstname, lastname, email, password }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    result = await result.json();
    console.warn(result.id);
    if (result) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    }
  };

  const logingo = () => {
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Register or Sign up Here!!!</h1>
      <Form className="regist-form">
        <Form.Group controlId="formGroupName" className="mb-3">
          <Row>
            <Col>
              <Form.Label></Form.Label>
              <Form.Control
                placeholder="First name"
                value={firstname}
                onChange={(e) => setfname(e.target.value)}
                className="form-input"
              />
              {errors.firstname && <span className="error">{errors.firstname}</span>}
            </Col>
            <Col>
              <Form.Label></Form.Label>
              <Form.Control
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setlname(e.target.value)}
                className="form-input"
              />
              {errors.lastname && <span className="error">{errors.lastname}</span>}
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formGroupEmail" className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="form-input"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </Form.Group>

        <Form.Group controlId="formGroupPassword" className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="form-input"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </Form.Group>

        <Button className="submit-button" variant="dark" onClick={collectdata}>
          Sign up!!
        </Button>
        <Button className="submit-button" variant="dark" onClick={logingo}>
          Go to Login
        </Button>
      </Form>
    </div>
  );
};

export default Regist;
