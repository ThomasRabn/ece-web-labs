import { useState, useContext } from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Core
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
// Layout
import { useTheme } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
// Popup
import Popup from 'reactjs-popup'

const useStyles = (theme) => ({
  root :{
    background: theme.palette.background.default,
    color: 'rgb(220,220,220)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& Paper': {
      border: 'none',
    },
  },
  welcomeTitle: {
    fontSize: 40,
    margin: 0,
    fontWeight: '400',
    },
  input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
})

export default (props) => {
  const styles = useStyles(useTheme())
  // Popup variables
  const contentStyle = { backgroundColor: useTheme().palette.background.default }
  const overlayStyle = { background: 'rgba(0,0,0,0.7)', zIndex: 1300 }
  const name = useState('')
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
            <h1 css={styles.welcomeTitle}>Invite a Friend</h1>
          </div>
        </div>
        <div>
          <Paper component="form"
          >
            <InputBase css={styles.input}
              placeholder="enter a name"
              inputProps={{ 'aria-label': 'enter a name' }}
            />
            <IconButton type="submit" //className={classes.iconButton}
              aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
    )}
    </Popup>
  )
}
