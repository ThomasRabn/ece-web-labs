import { useState,useContext } from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//Local
import Context from './Context'
import {
  useHistory
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const [ name , setname] = useState([])
  const [ email , setemail] = useState([])
  const history = useHistory();
  const onSubmit = async () => {
    await axios.post('http://localhost:3001/users/',
      {
        username: name,
        email: oauth.email,
      },
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      })
      setname('')
      setemail('')
  }

  const handleChange = (e) => {
    setname(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setemail(e.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div css={styles.paper}>
        <Avatar css={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form css={styles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            autoFocus
            value = {name}
            onChange = {handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value = {email}
            onChange = {handleChangeEmail}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            css={styles.submit}
            onClick = {(e) => {
              onSubmit();
              e.preventDefault()
              history.push("/channels")
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
