import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Core components
import {
  Button, TextField, Grid, Select, MenuItem, FormHelperText, 
  InputLabel, FormControl, Link 
} from '@material-ui/core'
// Lab
import Autocomplete from '@material-ui/lab/Autocomplete'
// Style
import { makeStyles, useTheme } from '@material-ui/core/styles'
// Icons
import Send from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'
// Popup
import Popup from 'reactjs-popup'
// Local
import Context from './Context'

const useClasses = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const useStyles = (theme) => ({
  channels: {
    paddingRight: '1em',
    paddingLeft: '1em',
    paddingTop: '1em'
  },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  modal: {
    backgroundColor: '#fff',
    border: '1px solid #fff'
  },
  send: {
    marginRight: '300px'
  },
  root: {
    flex: '1 1 auto',
    backgroundColor: theme.palette.background.default,
    color: 'rgb(220,220,220)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1em'
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
  centered: {
    marginBottom: 155,
  },
  title: {
    fontSize: 40,
    margin: '0.5em 0 0 0',
    fontWeight: '400',
  },
  select: {
    padding: 10,
  },
  divform: {
    display: 'block',
    textAlign: 'center',
  },
  form: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight:'auto',
    textAlign: 'center',
  }
})

export default (props) => {
  const styles = useStyles(useTheme())
  const classes = useClasses(useTheme())
  const { oauth, channels } = useContext(Context)
  const [chosenChannel, setChosenChannel ] = useState('')
  const [friends, setFriends ] = useState([])
  const [ userToChoose, setUserToChoose ] = useState([])
  const [ inputFriend, setInputFriend ] = useState('')
  // Popup variables
  const contentStyle = { backgroundColor: useTheme().palette.background.default }
  const overlayStyle = { background: 'rgba(0,0,0,0.7)', zIndex: 1300 }
  useEffect( () => {
    const fetch = async () => {
      try{
        let {data: response} = await axios.get('http://localhost:3001/usernames/search?name='+inputFriend, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setUserToChoose(response)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth.access_token, inputFriend])
  const onSubmit = async () => {
    friends.forEach(elem => delete elem.username)
    await axios.put(`http://localhost:3001/channels/`+chosenChannel.id+`/invite`,
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
        invitedUsers: friends,
      })
    setChosenChannel('')
    setFriends([])
    setUserToChoose([])
    setInputFriend('')
  }
  const handleChange = (e) => {
    setChosenChannel(e.target.value)
  }
  const handleChangeAutocomplete = (e, value) => {
    setFriends(value)
  }
  const handleChangeTextAutocomplete = (e) => {
    setInputFriend(e.target.value)
  }
  return (
    <Popup
      trigger={
        <Link
          href={`#`}
          style={{ color: 'white' }}
        >
          {props.children}
        </Link>
      }
      modal
      nested
      contentStyle={contentStyle}
      overlayStyle={overlayStyle}
    >
      {close => (
        <div css={styles.root}>
          <div css={styles.divform}>
            <div style={{ textAlign: 'center', margin: '0 0 0 0' }}>
              <h1 css={styles.title}>Invite friends to a channel</h1>
              <h3 style={{ fontStyle: 'italic' }}>Select the channel and the user you want to invite</h3>
            </div>
            <form css={styles.form} noValidate>
              <Grid>
              <FormControl css={classes.formControl} variant="filled">
                <InputLabel id="channel-label">Choose a channel</InputLabel>
                <Select
                  size='normal'
                  value={chosenChannel}
                  onChange={handleChange}
                  labelId="channel-label"
                  variant="filled"
                  style={{textAlign: 'left'}}
                >
                  <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem>
                  { channels.map( (channel, i) => (
                    <MenuItem key={i} value={channel}>{channel.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Make sure to choose a channel</FormHelperText>
              </FormControl>
              </Grid>
              <Grid>
              <FormControl css={classes.formControl} variant="filled">
                <Autocomplete
                  multiple
                  id="friends"
                  value={friends}
                  options={userToChoose}
                  getOptionLabel={(option) => option.username}
                  onChange={handleChangeAutocomplete}
                  style={{textAlign: 'left'}}
                  renderInput={(params) => <TextField {...params} value={inputFriend} onChange={handleChangeTextAutocomplete} label="Choose friends to invite" variant="filled" />}
                />
                <FormHelperText>The more you are, the more fun you have</FormHelperText>
              </FormControl>
              </Grid>
              <fieldset style={{ display: "flex", marginTop: '2em' }}>
                <Button
                  style={{ margin: "0 auto 0 auto" }}
                  type="input"
                  variant="contained"
                  color="secondary"
                  onClick={() => { close(); onSubmit() }}
                  endIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  style={{ margin: "0 auto 0 auto" }}
                  type="input"
                  variant="contained"
                  color="secondary"
                  onClick={() => { close(); onSubmit() }}
                  endIcon={<Send />}
                >
                  Send
                </Button>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </Popup>
  )
}
