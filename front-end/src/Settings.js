import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Style
import { useTheme } from '@material-ui/core/styles'
// Core components
import {
  TextField, Grid, InputLabel, InputAdornment, Input, Checkbox,
  FormControl, ListItemText, Select, Typography, Slider, Chip,
  Button, IconButton, Paper, MobileStepper, MenuItem
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  'Worms',
  'WOrms',
  'WORms',
  'WORMs',
  'WORMS',
  'WOORMS',
  'WOOORMS',
  'WOOOORMS',
  'WOOOOOORMS',
  'CHILl',
]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
]

export default () => {
  const theme = useTheme()
  const [values, setValues] = React.useState({
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
  //CheckBox
  const [checked, setChecked] = React.useState(true)
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked)
  }
  //Tag
  const [personName, setPersonName] = React.useState([])
  const handleChangeChips = (event) => {
    setPersonName(event.target.value)
  }
  //Volume
  const [valueV, setValueV] = React.useState(30)
  const handleChangeV = (event, newValue) => {
    setValueV(newValue)
  }
  //Image
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const styles = useStyles(useTheme())

  return (
    <div >
      <form css={styles.root} noValidate autoComplete="off">
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
          <TextField
            id="date"
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            id="time"
            label="Alarm clock"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChangeCheck}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
        <div>
          <FormControl css={styles.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={personName}
              onChange={handleChangeChips}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl css={styles.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={personName}
              onChange={handleChangeChips}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div css={styles.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} css={styles.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography id="continuous-slider" gutterBottom>
            Volume
        </Typography>
          <Grid container spacing={2}>
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
        </div>
        <div>
          <Paper square elevation={0} css={styles.header}>
            <Typography>{tutorialSteps[activeStep].label}</Typography>
          </Paper>
          <img
            css={styles.img}
            src={tutorialSteps[activeStep].imgPath}
            alt={tutorialSteps[activeStep].label}
          />
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
            }
          />
        </div>
      </form>
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
    </div>
  )
}
