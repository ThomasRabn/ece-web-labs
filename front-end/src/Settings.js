import { useState, useContext, useEffect } from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Style
import { useTheme, makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
// Core components
import {
  TextField, Grid, InputLabel, InputAdornment, Input, Checkbox,
  FormControl, Typography, Slider, Button, IconButton, Container,
  Switch, Avatar
} from '@material-ui/core'
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import MailIcon from '@material-ui/icons/Mail'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockIcon from '@material-ui/icons/Lock'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import SendIcon from '@material-ui/icons/Send'
// Local
import Context from './Context'

const useClasses = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: 5,
  },
  marged: {
    marginLeft: 50,
  },
  marginTop: {
    marginTop: 5,
  },
  title: {
    fontSize: 40,
    marginBottom: '1em',
    marginTop: '1em',
  },
  container: {
    margin: '2em 0 2em 0'
  }
})

/******** Settings Page with multiple Material UI Components ********/
/******** AVATAR UPDATE IS WORKING ********/
export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const classes = useClasses(useTheme())
  // Password 1
  const [valuesPassword, setValuesPassword] = useState({
    password: '',
    showPassword: false,
  })
  const handleClickShowPassword = () => {
    setValuesPassword({ ...valuesPassword, showPassword: !valuesPassword.showPassword })
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleChangePassword = (prop) => (event) => {
    setValuesPassword({ ...valuesPassword, [prop]: event.target.value })
  }
  // Verify password
  const [valuesVerify, setValuesVerify] = useState({
    password: '',
    showPassword: false,
  })
  const handleClickShowVerify = () => {
    setValuesVerify({ ...valuesVerify, showPassword: !valuesVerify.showPassword })
  }
  const handleMouseDownVerify = (event) => {
    event.preventDefault()
  }
  const handleChangeVerify = (prop) => (event) => {
    setValuesVerify({ ...valuesVerify, [prop]: event.target.value })
  }
  // Username
  const [username, setUsername] = useState(oauth.email)
  useEffect( () => {
    const fetch = async () => {
      try{
        let {data: user} = await axios.get('http://localhost:3001/useremails/'+oauth.email, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setUsername(user.username)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth])
  // Dark mode switch
  const [switchStatus, setSwitchStatus] = useState(false)
  const handleChangeSwitch = () => {
    setSwitchStatus(!switchStatus);
  }
  //CheckBox
  const [checked, setChecked] = useState(false)
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked)
  }
  //Volume
  const [valueV, setValueV] = useState(30)
  const handleChangeV = (event, newValue) => {
    setValueV(newValue)
  }
  // Profile picture
  const [profil, setProfil] = useState(`http://127.0.0.1:3001/${oauth.email}.png`)
  const [image, setImage] = useState()
  const handleChangeProfil = (e) => {
    setProfil(`http://127.0.0.1:3001/${e.target.alt}.png`)
    console.log(profil)
  }
  //Drag and DropzoneArea
  //Limit to 1MB and to png type
  const handleChangeFile = (files) => {
    if(files[0]) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setImage(files[0])
        setProfil(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }
  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (image) {
      const data = new FormData()
      data.append('file', image)
      axios.post("http://localhost:3001/public", data, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      })
      setImage()
      window.location.reload()
    }
  }
  return (
    <div css={styles.root} >
      <div css={styles.marged}>
        <h1 css={styles.title}>Your settings</h1>
        <Container css={styles.container} >
          <Grid container>
            <Grid container xs={6} spacing={2} justify="flex-start">
              <h2 style={{marginBottom: 5}}>Your account informations</h2>
            </Grid>
            <Grid container xs={6} spacing={2} justify="center" >
              <h2 style={{marginBottom: 5}}>Your avatar</h2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container xs={6} spacing={2} alignItems="flex-end" >
              <Grid item>
                <MailIcon />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Email Address" value={oauth.email} disabled />
              </Grid>
            </Grid>
            <Grid container xs={6} spacing={2} justify="center" alignItems="center" >
              <Grid item>
                <Avatar alt="avatar" src={profil} className={classes.large} />
              </Grid>
              <Grid item>
                <Typography>That's a pretty good picture!</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container xs={6} spacing={2} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Username" value={username} disabled />
              </Grid>
            </Grid>
            <Grid container xs={6} spacing={2} justify="center">
              <Grid item>
                <Avatar alt="boulanger" src={`http://127.0.0.1:3001/boulanger.png`} onClick={handleChangeProfil}/>
              </Grid>
              <Grid item>
                <Avatar alt="medecin" src={`http://127.0.0.1:3001/medecin.png`} onClick={handleChangeProfil}/>
              </Grid>
              <Grid item>
                <Avatar alt="ouvrier" src={`http://127.0.0.1:3001/ouvrier.png`} onClick={handleChangeProfil}/>
              </Grid>
              <Grid item>
                <Avatar alt="policier" src={`http://127.0.0.1:3001/policier.png`} onClick={handleChangeProfil}/>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
            <Grid container direction="column" xs={6} style={{marginTop: '4.3em'}}>
              <Grid container spacing={2} justify="flex-start" >
                <h2 style={{marginBottom: 15}}>Change your password</h2>
              </Grid>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <LockIcon />
                </Grid>
                <FormControl>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={valuesPassword.showPassword ? 'text' : 'password'}
                    value={valuesPassword.password}
                    onChange={handleChangePassword('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {valuesPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <br/>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <LockIcon />
                </Grid>
                <FormControl>
                  <InputLabel htmlFor="verify-password">Verify password</InputLabel>
                  <Input
                    id="verify-password"
                    type={valuesVerify.showPassword ? 'text' : 'password'}
                    value={valuesVerify.password}
                    onChange={handleChangeVerify('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowVerify}
                          onMouseDown={handleMouseDownVerify}
                        >
                          {valuesVerify.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container xs={6} direction="column" alignItems="flex-end" style={{marginTop: '1.5em'}}>
              <DropzoneArea
                onChange={handleChangeFile}
                acceptedFiles={['image/png']}
                maxFileSize={1000000}
              />
              <Grid item style={{marginTop: 5}}>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                  onClick={handleSubmitFile}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Container>
        <Container css={styles.container} style={{marginTop: -15}} >
          <Grid container>
            <Grid container xs={6} spacing={2} justify="flex-start" >
              <h2 style={{marginBottom: 15}}>Appearance & Information</h2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container xs={6} spacing={2} jusitify="flex-start" alignItems="center" >
              <Grid item>
                <Brightness4Icon />
              </Grid>
              <Typography>Dark mode</Typography>
              <Switch checked={switchStatus} color="secondary" onChange={handleChangeSwitch} name="switch" />
            </Grid>
          </Grid>
          <br/>
          <Grid container>
            <Grid container xs={6} spacing={2} jusitify="flex-start" alignItems="center" >
              <Grid item>
                <NewReleasesIcon />
              </Grid>
              <Typography>Activate beta features</Typography>
              <Checkbox
                checked={checked}
                onChange={handleChangeCheck}
                color='secondary'
                inputProps={{ 'aria-label': 'checkbox' }}
              />
            </Grid>
          </Grid>
          <br/>
          <Grid container>
            <Grid container xs={6} spacing={2} alignItems="center" >
              <Grid item>
                <VolumeUp />
              </Grid>
              <Typography>Notifications's volume: </Typography>
              <Grid item xs={1}/>
              <Grid container xs={6} spacing={2} jusitify="flex-start" alignItems="center">
                <Grid item>
                  <VolumeDown />
                </Grid>
                <Grid item xs>
                  <Slider value={valueV} onChange={handleChangeV} aria-labelledby="continuous-slider" />
                </Grid>
                <Grid item>
                  <VolumeUp />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
