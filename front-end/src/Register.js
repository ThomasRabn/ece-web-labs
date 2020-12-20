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

const useClasses = (theme) => ({
  root: {
    flex: '1 1 auto',
    color: 'rgb(220,220,220)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centered: {
    marginBottom: 155,
  },
})

export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const classes = useClasses(useTheme())
  const [ name, setName ] = useState('')
  const [ error, setError ] = useState(false)
  const [ image, setImage] = useState()
  const [ preview, setPreview ] = useState()
  const history = useHistory()
  const onSubmit = (e) => {
    e.preventDefault()
    if(name.length > 0) {
      axios.post('http://localhost:3001/users/',
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
      if (image) {
        const data = new FormData()
        data.append('file', image)
        axios.post("http://localhost:3001/public", data, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
        })
        setImage('')
      }
      history.push('/')
      window.location.reload()
    } else {
      setError(true)
    }
  }
  const handleChange = (e) => {
    setError(false)
    setName(e.target.value)
  }
  const handleFiles = (e) => {
    e.preventDefault()
    const file = e.target.files
    let reader = new FileReader()
    reader.onloadend = () => {
      setImage(file[0])
      setPreview(reader.result)
    }
    reader.readAsDataURL(file[0])
  }
  return (
    <div css={classes.root}>
      <Container css={classes.centered} component="main" maxWidth="xs">
        <CssBaseline />
        <div css={styles.paper}>
          <Avatar css={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Choose your Username
          </Typography>
          <form css={styles.form} encType="multipart/form-data">
            <Grid container alignItems="center" spacing={1}>
              <Grid xs={12}>
                <TextField
                  error={error}
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
                <Avatar css={styles.avatar} src={preview}/>
              </Grid>
              <Grid xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  css={styles.submit}
                  onClick = {onSubmit}
                >
                  Set Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  )
}
