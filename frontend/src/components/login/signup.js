import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; 
import './signup.css';


const apiInstance = axios.create({
  baseURL: 'http://api.vnear.in/api', // Set the base URL for your API
});


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiInstance.post('/register', { username, email, password }); // Use the Axios instance for API call

      if (response.status === 200) {
        // User registration successful
        // You can perform any necessary actions, such as displaying a success message, redirecting to a different page, etc.
        console.log('User registered successfully!');
      } else {
        // User registration failed
        // You can handle the error accordingly, such as displaying an error message
        console.log('User registration failed.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }

    // Reset the form after submission
    setUsername('');
    setEmail('');
    setPassword('');
  };
  
  return (
    <div className='container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupPage;

