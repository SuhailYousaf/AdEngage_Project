import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../../redux/features/authSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, name, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords should match');
    }
    if (email && password && name && confirmPassword) {
      await dispatch(register({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div style={{ margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px' }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x'>
          <h5>Sign Up</h5>
        </MDBIcon>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-12'>
              <MDBValidationItem feedback='Please provide your Name' invalid={name === ''}>
                <MDBInput
                  label='Name'
                  type='text'
                  value={name}
                  name='name'
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className='col-md-12'>
              <MDBValidationItem feedback='Please provide a valid email' invalid={!/.+@.+\..+/.test(email)}>
                <MDBInput
                  label='Email'
                  type='email'
                  value={email}
                  name='email'
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className='col-md-12'>
              <MDBValidationItem feedback='Please provide your password' invalid={password === ''}>
                <MDBInput
                  label='Password'
                  type='password'
                  value={password}
                  name='password'
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className='col-md-12'>
              <MDBValidationItem feedback='Please confirm your password' invalid={confirmPassword === ''}>
                <MDBInput
                  label='Confirm Password'
                  type='password'
                  value={confirmPassword}
                  name='confirmPassword'
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className='col-12'>
              <MDBBtn style={{ width: '100%' }} className='mt-2' type='submit' disabled={loading}>
                {loading && <MDBSpinner size='sm' role='status' tag='span' className='me-2' />}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p>Already have an account? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
