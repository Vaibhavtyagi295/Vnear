import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; 

const apiInstance = axios.create({
  baseURL: 'http://api.vnear.in/api', // Set the base URL for your API
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginOption, setLoginOption] = useState('email');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiInstance.post('/login', { email, username, password }); // Use the Axios instance for API call

      const data = response.data;

      if (response.status === 200) {
        // Save the token in localStorage or sessionStorage for further use
        localStorage.setItem('token', data.token);
        // Redirect to the main page or any other authenticated route
        window.location.href = '/';
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred');
    }
  };


  return (
    <Container className="login-page">
      <Row className="justify-content-center">
        <Col md={6} className="login-card">
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="loginOption">
              <Form.Label>Login as:</Form.Label>
              <Form.Control
                as="select"
                value={loginOption}
                onChange={(e) => setLoginOption(e.target.value)}
              >
                <option value="email">User (Email)</option>
                <option value="worker">Worker (Username)</option>
              </Form.Control>
            </Form.Group>

            {loginOption === 'email' ? (
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
