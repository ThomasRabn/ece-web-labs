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
  Typography, Avatar, Button, CssBaseline, TextField, Container, Fab, Grid
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
  const [ img , setImg] = useState()
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
          name: oauth.email + '.png',
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
  const handleFiles = async (e) => {
    setImage(e.target.files)
    const file = e.target.files
    const data = new FormData()
    data.append('file', file[0])
    await axios.post("http://localhost:3001/public", data, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    setImg(`http://127.0.0.1:3001/${oauth.email}.png`)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div css={styles.paper}>
        <Avatar css={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Choose your Username
        </Typography>
        <form css={styles.form} method="POST" encType="multipart/form-data">
         <Grid container alignItems="center" spacing={1}>
         <Grid xs={12}>
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
          </Grid>
          <Grid item xs={5}>
            <label htmlFor="avatar">
              <input
                style={{ display: "none" }}
                id="avatar"
                name="avatar"
                type="file"
                onChange = {handleFiles}
                accept="image/png"
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
          </Grid>
          <Grid item xs>
            <Avatar css={styles.avatar} src={img}/>
          </Grid>
          <Grid xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            css={styles.submit}
            onClick = {(e) => {
              onSubmit()
              e.preventDefault()
              history.push("/")
              //allows to refresh the avatar
              window.location.reload(false)
            }}
          >
            Set Changes
          </Button>
          </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
