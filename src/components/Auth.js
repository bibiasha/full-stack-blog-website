import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {authActions} from '../store/index';

function Auth() {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async (type = "login") => {
    try {
      const response = await axios.post(`http://localhost:5000/api/user/${type}`, {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password
        });
  
      const data = response.data;
      console.log("data",data)
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={'column'}
          alignItems='center'
          justifyContent={'center'}
          boxShadow='10px 10px 10px 10px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={40}
          width={500}
        >
          <Typography 
          variant='h3' 
          padding={3} 
          textAlign={'center'}
          >{isSignup? "Signup":"Login"}</Typography>

          {isSignup && <TextField 
          name='name' 
          onChange={handleChange} 
          value={inputs.name} 
          placeholder='Name' 
          margin='normal' />}

          <TextField 
          name='email' 
          onChange={handleChange} 
          value={inputs.email} 
          type={'email'} 
          placeholder='Email' 
          margin='normal' />

          <TextField 
          name='password' 
          onChange={handleChange} 
          value={inputs.password} 
          type={'password'} 
          placeholder='Password' 
          margin='normal' />

          <Button 
          type='submit' 
          variant='contained' 
          sx={{ borderRadius: 3, marginTop: 3, width: 160 }} 
          color='warning'
          >Submit</Button>

          <Button 
          onClick={() => setIsSignup(!isSignup)} 
          sx={{ borderRadius: 3, marginTop: 2 }}
          >Change To {isSignup ? 'Login' : 'Signup'}</Button>

        </Box>
      </form>

    </div>
  )
}

export default Auth
