import { useState, useContext } from 'react'
import axios from 'axios'
import {
  useHistory
} from 'react-router-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Style
import { useTheme, makeStyles } from '@material-ui/core/styles'
// Core components
import {
  Typography, Avatar, Button, CssBaseline, TextField, Container, Fab
} from '@material-ui/core'
// Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AddIcon from '@material-ui/icons/Add'
//Local
import Context from './Context'

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
    '& > div' : {
      marginTop: theme.spacing(20)
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const [ name , setName] = useState()
  const [ email , setEmail] = useState()
  const [ image , setImage] = useState()
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
    setName('')
    setEmail('')
    //const data = new FormData()
    //data.append('file', image)
    if (image) {
      await axios.post('http://localhost:3001/images/',
      {
        image: {
          name: image[0].name,
        },
        owner : oauth.email,
      },
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      })
      setImage('')
    }
  }
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleFiles = (e) => {
    setImage(e.target.files)
    const file = e.target.files
    const data = new FormData()
    data.append('file', file[0])
    axios.post("http://localhost:3001/upload", data)
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
        <form css={styles.form} method="POST" encType="multipart/form-data">
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
          <div>
          <label htmlFor="avatar">
            <input
              style={{ display: "none" }}
              id="avatar"
              name="avatar"
              type="file"
              //value = {image}
              onChange = {handleFiles}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              >
                <AddIcon /> Upload photo
              </Fab>
          </label>
          </div>
          <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            css={styles.submit}
            onClick = {(e) => {
              onSubmit()
              e.preventDefault()
              history.push("/channels")
            }}
          >
            Sign In
          </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
