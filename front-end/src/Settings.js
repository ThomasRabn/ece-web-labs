import {useContext, useState} from 'react';
/** @jsx jsx */
import { jsx, ThemeContext} from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
//Core
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import React from 'react';
//Icon
import MailIcon from '@material-ui/icons/Mail'
import Button from '@material-ui/core/Button'
import Send from '@material-ui/icons/Send'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
// Local
import Context from './Context'

const useStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
})

export default () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

const handleChange = (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        }

  const styles = useStyles(useTheme())
  const {oauth} = useContext(Context)

  return (
    <div >
      <form  css={styles.root} noValidate autoComplete="off">
       <div>
       <Grid container spacing={1} alignItems="flex-end">
         <Grid item>
           <AccountCircle />
         </Grid>
         <Grid item>
           <TextField id="input-with-icon-grid" label="Name" />
         </Grid>
       </Grid>
       </div>
       <div>
       <Grid container spacing={1} alignItems="flex-end">
         <Grid item>
           <MailIcon />
         </Grid>
         <Grid item>
           <TextField id="input-with-icon-grid" label="Email Adress" />
         </Grid>
       </Grid>
       </div>
       <div css={styles.margin}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
         id="standard-adornment-password"
         type={values.showPassword ? 'text' : 'password'}
         value={values.password}
         onChange={handleChange('password')}
         endAdornment={
           <InputAdornment position="end">
             <IconButton
               aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword}
             >
               {values.showPassword ? <Visibility /> : <VisibilityOff />}
             </IconButton>
           </InputAdornment>
          }
          />
       </div>
       <div>
       <Button
         style={{ marginLeft: "0 15% 0 auto" }}
         type="input"
         variant="contained"
         color="secondary"
         //onClick={}
         endIcon={<Send />}
       >
         Edit
       </Button>
       </div>
      </form>
    </div>
  );
}
