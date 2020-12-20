import { useState, useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Style
import { useTheme, makeStyles } from '@material-ui/core/styles'
// Core components
import {
  TextField, Grid, InputLabel, InputAdornment, Input, Checkbox,
  FormControl, ListItemText, Select, Typography, Slider, Chip,
  Button, IconButton, Paper, MobileStepper, MenuItem, Container,
  Switch, FormControlLabel, Avatar
} from '@material-ui/core'
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import MailIcon from '@material-ui/icons/Mail'
import Send from '@material-ui/icons/Send'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockIcon from '@material-ui/icons/Lock'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
// Colors
import { deepOrange } from '@material-ui/core/colors'
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
    marginBottom: '1e m',
    marginTop: '1em',
  },
  container: {
    margin: '2em 0 2em 0'
  }
})

export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const classes = useClasses(useTheme())
  const theme = useTheme()
  const danger = deepOrange[500];
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })
  //Password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
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
  //Tag
  const [personName, setPersonName] = useState([])
  const handleChangeChips = (event) => {
    setPersonName(event.target.value)
  }
  //Volume
  const [valueV, setValueV] = useState(30)
  const handleChangeV = (event, newValue) => {
    setValueV(newValue)
  }
  //Image
  const [activeStep, setActiveStep] = useState(0)
  //const maxSteps = tutorialSteps.length
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  return (
    <div css={styles.root} >
      <div css={styles.marged}>
        <h1 css={styles.title}>Your settings</h1>
        <Container css={styles.container} >
          <Grid container >
          <Grid item xs={6} >
              <h2 style={{marginBottom: 5}}>Your personal informations</h2>
            </Grid>
            <Grid item xs={6} justify="center" >
              <h2 style={{marginBottom: 5, textAlign: 'center'}}>Your avatar</h2>
            </Grid>
          </Grid>
          <Grid container  >
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
                <Avatar alt="avatar" src={`http://127.0.0.1:3001/public/${oauth.email}.png`} className={classes.large} />
              </Grid>
              <Grid item>
                <Typography>That's a pretty good picture!</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={6} spacing={2} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Name" />
            </Grid>
          </Grid>
          <Grid container xs={6} spacing={2} alignItems="flex-end">
            <Grid item>
              <LockIcon />
            </Grid>
            <FormControl>
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
            </FormControl>
          </Grid>
        </Container>
        <Container css={styles.container} >
          <Grid container>
            <Grid item xs={6} >
              <h2 style={{marginBottom: 15}}>Appearance & Information</h2>
            </Grid>
          </Grid>
          <Grid container xs={6} spacing={2} alignItems="center" >
            <Grid item>
              <Brightness4Icon />
            </Grid>
            <Typography>Dark mode</Typography>
            <Switch checked={switchStatus} color="secondary" onChange={handleChangeSwitch} name="switch" />
          </Grid>
          <Grid container xs={6} spacing={2} alignItems="center" >
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
          <Grid container xs={6} spacing={2} alignItems="center" >
            <Grid item>
              <VolumeUp />
            </Grid>
            <Typography>Notifications's volume: </Typography>
            <Grid item xs={1}/>
            <Grid container xs={6} spacing={2} alignItems="flex-end">
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
        </Container>
      </div>
    </div>
  )
}
