import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import Input from './Input';
import { signin, signup} from '../../actions/auth';

const initialState = { fisrtName: '', lastName: '', email: '', password: '', confirmPassword: '', }

const Auth = () => {
   const classes = useStyles();
   const [showPassword, setShowPassword] = useState(false);
   const [isSignedup, setIsSignedup] = useState(false);
   const [formData, setFormData] = useState(initialState);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

   const handleSubmit = (e) => {
      e.preventDefault();
      
      if (isSignedup) {
         dispatch(signup(formData, navigate))
      } else {
         dispatch(signin(formData, navigate))
      }
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   };

   const switchMode = () => {
      setIsSignedup((prevIsSignedup) => !prevIsSignedup);
      setShowPassword(false);
   };

   // const googleSuccess = async (res) => { 
   //    const result = res?.profileObj;
   //    const token = res?.tokenId;

   //    try {
   //       dispatch({ type: 'AUTH', data: { result, token } });

   //       navigate('/');
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   // const googleFailure = (error) => { 
   //    console.log(error);
   //    console.log("Google Sign in was unsuccessful. Try again later.");
   // };

   return (
      <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignedup ? 'Sign up' : 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  { isSignedup && (
                        <>
                           <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                           <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                        </>
                  )}
                  <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                  <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                  {isSignedup && <Input name="confirmPassword" label="Reapeat Password" handleChange={handleChange} type="password" />}
               </Grid>
               <Button className={classes.submit} type='submit' fullWidth variant='contained' color='primary'>
                  {isSignedup ? 'Sign Up' : 'Sign In'}
               </Button>
               <Button className={classes.googleButton} color='primary' fullWidth variant='contained' disabled>Google Sign In</Button>
               {/* <GoogleLogin
                  clientId="Google Id"
                  render={(renderProps) => (
                     <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained'>Google Sign In</Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
               /> */}
               <Grid container>
                  <Grid item>
                     <Button onClick={switchMode}>
                        { isSignedup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
   );
};

export default Auth;