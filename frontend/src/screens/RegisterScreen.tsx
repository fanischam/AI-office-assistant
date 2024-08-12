import React from 'react';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterScreen: React.FC = () => {
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='name' placeholder='Enter name'></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email'></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
          ></Form.Control>
        </Form.Group>

        <Button disabled={false} type='submit' variant='primary'>
          Register
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={'/login'} className='text-decoration-none'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
