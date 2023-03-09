import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material'
import { useDispatch } from 'react-redux';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Input from './Input.jsx';
import jwt_decode from 'jwt-decode'
import { signIn, signUp,addImg } from '../../store/PostsSlice.js';
import { existsApi } from '../../api/index.js';



function Auth() {
  const dispatch = useDispatch();
  const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPass: "" };
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleGoogleResponse = async (response) => {
    var userObj = jwt_decode(response.credential);
    // console.log(userObj)
    var obj = await existsApi(userObj.email);
    if (obj.data.exists) {
      dispatch(signIn({ firstName: userObj.given_name, lastName: userObj.family_name, email: userObj.email, password: userObj.sub, confirmPass: userObj.sub ,imgUrl:userObj.picture}));
    }
    else {
      dispatch(signUp({ firstName: userObj.given_name, lastName: userObj.family_name, email: userObj.email, password: userObj.sub, confirmPass: userObj.sub ,imgUrl:userObj.picture}))
    }
    setFormData(initialState);
    // dispatch(addImg(userObj.picture))
    navigate('/');
  }
  useEffect(() => {
    //google object is decalared from the script in index.html file
    google.accounts.id.initialize({
      client_id: "221267147766-1rbla6bn74m6lk6qfsk9ai920k7drn0m.apps.googleusercontent.com",
      callback: handleGoogleResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('GSignIn'),
      { theme: 'outline', size: 'large' }
    )
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData));
    }
    else {
      dispatch(signIn(formData));
    }
    setFormData(initialState);
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const switchMode = () => setIsSignup(!isSignup)
  return (
    <Container component={"main"} maxWidth='xs'>
      <Paper elevation={6} className='d-flex flex-column justify-content-center align-items-center'>
        <Avatar>
          <LockRoundedIcon />
        </Avatar>
        <h3>{isSignup ? 'Sign Up' : 'Sign In'}</h3>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label="FirstName" handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label="LastName" handleChange={handleChange} half />
                </>
              )
            }
            <Input name='email' label={'Email Address'} handleChange={handleChange} type='email' />
            <Input name='password' label={'Password'} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPass' label='Confirm Password' handleChange={handleChange} type='password' />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent={'flex-end '}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account?? Login here' : 'No Account?? Register Here'}
              </Button>
            </Grid>
          </Grid>
          <div id='GSignIn' className='d-flex justify-content-center'>
            {/* Google Sign In Button */}
          </div>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth