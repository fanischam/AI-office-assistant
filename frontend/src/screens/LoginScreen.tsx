import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginScreen: React.FC = () => {
  return (
    <FormContainer>
      <h1 className='my-5'>Sign In</h1>

      <Form>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={false} type='submit' variant='dark'>
          Sign In
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to='/' className='text-decoration-none'>
            Register here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
