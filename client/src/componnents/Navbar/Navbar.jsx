import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import Booking from '../../images/Booking.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispath = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => { 
     dispath({ type: 'LOGOUT' });

     navigate('/');

     setUser(null);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));

    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location])
  

  return (
   <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer} onClick={() => { navigate('/') }}>
        <img className={classes.image} src={Booking} alt="Logo" height="60"/>
        <Typography className={classes.heading} variant='h2' align='center'>RoomBooker</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            {/* <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography> */}
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
        )}
      </Toolbar>
   </AppBar>
  );
};

export default Navbar;