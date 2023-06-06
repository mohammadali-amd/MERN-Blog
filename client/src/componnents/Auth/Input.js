import React from 'react';
import { Grid, TextField } from '@material-ui/core';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, half, label, handleChange, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
         name={name}
         label={label}
         onChange={handleChange}
         fullWidth
         required
         autoFocus={autoFocus}
         type={type}
         variant='outlined'
         // inputProps={name === 'password' && {
         //    endAdorment: (
         //       <InputAdornment position='end'>
         //          <IconButton onClick={handleShowPassword}>
         //             {type === "password" ? <Visibility /> : <VisibilityOff />}
         //          </IconButton>       
         //       </InputAdornment>
         //    )
         // }}
      />
    </Grid>
  );
};

export default Input;