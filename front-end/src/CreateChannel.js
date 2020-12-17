import { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Styles
import { useTheme } from '@material-ui/core/styles'
// Core components
import {
  Button, TextField, Grid, Link
} from '@material-ui/core'
// Icons 
import Send from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'
// Popup
import Popup from 'reactjs-popup'
// Local
import Context from './Context'

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
})

export default (props) => {
  const styles = useStyles(useTheme())
  const history = useHistory()
  const { oauth, channels, setChannels } = useContext(Context)
  // Popup variables
  const contentStyle = { backgroundColor: useTheme().palette.background.default }
  const overlayStyle = { background: 'rgba(0,0,0,0.7)', zIndex: 1300 }
  const [name, setName] = useState('')
  const onSubmit = async () => {
    const {data: answer} = await axios.post(`http://localhost:3001/channels/`,
      {
        channel: {
          name: name
        },
        owner: oauth.email,
      },
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      }
    )
    setName('')
    channels.push(answer)
    setChannels(channels)
    history.push(`/channels/${answer.id}`)
  }
  const handleChange = (e) => {
    setName(e.target.value)
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
          <div>
            <div style={{ textAlign: 'center', margin: '0 0 0 0' }}>
              <h1 css={styles.title}>Create a new channel</h1>
              <h3 style={{fontStyle: 'italic'}}>Please enter its information</h3>
            </div>
            <form css={styles.form} noValidate>
              <fieldset>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <TextField id="name" value={name} onChange={handleChange} name="name" label="Channel name" variant="filled" />
                  </Grid>
                </Grid>
              </fieldset>
              <fieldset>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <TextField id="people" name="people" label="People to invite" variant="filled" />
                  </Grid>
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
