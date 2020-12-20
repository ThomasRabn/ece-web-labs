import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Styles
import { useTheme, makeStyles } from '@material-ui/core/styles'
// Core components
import {
  Button, TextField, Grid, Link, FormControl, FormHelperText
} from '@material-ui/core'
// Lab
import Autocomplete from '@material-ui/lab/Autocomplete'
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
  divform: {
    display: 'block',
    textAlign: 'center',
    maxWidth: 400,
  },
  centered: {
    marginBottom: 155,
  },
  title: {
    fontSize: 40,
    margin: '0.5em 0 0 0',
    fontWeight: '400',
  },
})

/******** Popup for channel creation ********/
export default (props) => {
  const styles = useStyles(useTheme())
  const classes = useClasses(useTheme())
  const history = useHistory()
  const { oauth, channels, setChannels } = useContext(Context)
  const [name, setName] = useState('')
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
  // Post to create the channel
  const onSubmit = async () => {
    // We save all the chosen users' IDs from friends in a new array
    var idArray =  []
    friends.forEach(element => {
      idArray.push(element.id)
    })
    console.log(idArray)
    // Post on the back-end's route
    const {data: answer} = await axios.post(`http://localhost:3001/channels/`,
      {
        channel: {
          name: name
        },
        invitedUsers: idArray,
      },
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      }
    )
    setName('')
    channels.push(answer)
    // Move to the created channel
    setChannels(channels)
    history.push(`/channels/${answer.id}`)
  }
  // Handles
  const handleChange = (e) => {
    setName(e.target.value)
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
          style={{color: 'white'}}
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
              <h1 css={styles.title}>Create a new channel</h1>
              <h3 style={{fontStyle: 'italic'}}>Please enter its information</h3>
            </div>
            <form noValidate>
              <fieldset style={{marginBottom: 15}}>
                <Grid container spacing={1} justify="center">
                  <FormControl css={classes.formControl} variant="filled" fullWidth>
                    <TextField fullWidth id="name" value={name} onChange={handleChange} name="name" label="Channel name" variant="filled"  />
                  </FormControl>
                </Grid>
              </fieldset>
              <fieldset>
                <Grid container spacing={1} justify="center">
                  <FormControl css={classes.formControl} variant="filled" fullWidth>
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
              </fieldset>
              <fieldset style={{ display: "flex", marginTop: '2em' }}>
                <Button
                  style={{ margin: "0 auto 0 auto" }}
                  type="input"
                  variant="contained"
                  color="secondary"
                  onClick={ () => {close(); onSubmit()}}
                  endIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  style={{ margin: "0 auto 0 auto" }}
                  type="input"
                  variant="contained"
                  color="secondary"
                  onClick={ () => {close(); onSubmit()}}
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
