import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles'
import {
  Grid, IconButton, Menu, MenuItem, Typography, ListItemIcon, DialogTitle,
  DialogContentText, DialogContent, DialogActions, Dialog, Slide, Button, TextField
} from '@material-ui/core'
// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
// Local
import Context from '../Context'
// Luxon
var { DateTime } = require('luxon');

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    'pre': {
      
      overflowY: 'auto',
    },
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
  marged: {
    marginLeft: 20,
  }
})

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

/****** Confirm Delete Popup *******/
const ConfirmDelete = ({
  channel,
  message,
  updateMessages,
  setMenu
}) => {
  const [open, setOpen] = useState(false)
  const { oauth } = useContext(Context)
  const handleDelete = async () => {
    setMenu(null)
    console.log(`http://localhost:3001/channels/${channel.id}/messages/${message.creation}`)
    await axios.delete(`http://localhost:3001/channels/${channel.id}/messages/${message.creation}`,
    {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    updateMessages()
  }
  const handleOpenDelete = () => {
    setOpen(true)
  }
  const handleCloseDelete = () => {
    setOpen(false)
    setMenu(null)
  }
  return (
    <div>
      <MenuItem onClick={handleOpenDelete}>
        <ListItemIcon><DeleteIcon/></ListItemIcon>
        <Typography variant="inherit">Delete</Typography>
      </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Do you want to delete this message?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Channel: </b>
            { channel.name }
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Content: </b>
            { message.content }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

/****** Confirm Modify Popup *******/
const ConfirmModify = ({
  channel,
  message,
  updateMessages,
  setMenu
}) => {
  const [open, setOpen] = useState(false)
  const [messageContent, setMessageContent] = useState(message.content)
  const { oauth } = useContext(Context)
  const handleModify = async () => {
    setMenu(null)
    console.log(`http://localhost:3001/channels/${channel.id}/messages/${message.creation}`)
    await axios.put(`http://localhost:3001/channels/${channel.id}/messages/${message.creation}`,
    {
      content: messageContent
    },
    {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    updateMessages()
  }
  const handleOpenModify = () => {
    setOpen(true)
  }
  const handleCloseModify = () => {
    setOpen(false)
    setMenu(null)
  }
  const handleChangeMessage = (e) => {
    setMessageContent(e.target.value)
  }
  return (
    <div>
      <MenuItem onClick={handleOpenModify}>
        <ListItemIcon><CreateIcon/></ListItemIcon>
        <Typography variant="inherit">Modify</Typography>
      </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModify}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"A mistake? 😱 Don't worry, you can modify your message 🥳"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Channel: </b>
            { channel.name }
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              autoFocus
              margin="dense"
              id="message"
              type="text"
              value={messageContent}
              onChange={handleChangeMessage}
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModify} color="primary">
            Disagree
          </Button>
          <Button onClick={handleModify} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

/****** Default Component returning the list of messages of the channel *******/
export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  updateMessages,
}, ref) => {
  const [menu, setMenu] = useState(null);
  const styles = useStyles(useTheme())
  const styleDate = {weekday: 'long', day: 'numeric', month: 'long',  year: 'numeric', hour: 'numeric', minute: '2-digit'}
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  const handleOpenMenu = (event) => {
    setMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setMenu(null)
  }
  // If there are messages:
  const printMessages = (e) => {
    return (
      <ul>
      { messages.map((message) => (
        <li key={message.creation} css={styles.message} spacing={2}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"          
          >
            <Grid item xs={11} zeroMinWidth>
              <p>
                <span><b>{message.author}</b></span>
                {' - '}
                {
                  <span>{(new DateTime.fromISO((new Date(message.creation/1000)).toISOString())).setLocale('en-GB').toLocaleString(styleDate)}</span>
                }
              </p>
              <div dangerouslySetInnerHTML={{__html: message.content}}></div>
            </Grid>
            <Grid item xs style={{marginLeft: 15}}>
              <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleOpenMenu}>
                <MoreVertIcon/>
              </IconButton>
              <Menu
                id="menu"
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={handleCloseMenu}
              >
                <ConfirmModify message={message} channel={channel} updateMessages={updateMessages} setMenu={setMenu}/>
                <ConfirmDelete message={message} channel={channel} updateMessages={updateMessages} setMenu={setMenu}/>
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon><CloseIcon/></ListItemIcon>
                  <Typography variant="inherit">Cancel</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </li>
      )) }
      </ul>
    )
  }
  // If no message:
  const emptyScreen = (e) => {
    return (
      <h2 css={styles.marged}>There is no message in this channel</h2>
    )
  }
  return (
    <div css={styles.root} ref={rootEl}>
      <h1 css={styles.marged}>Messages for {channel.name}</h1>
      { messages.length > 0 ? printMessages() : emptyScreen() }
      <div ref={scrollEl} />
    </div>
  )
})
