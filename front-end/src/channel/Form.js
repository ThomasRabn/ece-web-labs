import { useState, useContext } from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles'
// Core
import {
  Button, TextField
} from '@material-ui/core'
// Icons
import SendIcon from '@material-ui/icons/Send'
// Local
import Context from '../Context'

const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    form: {
      borderTop: `2px solid ${borderColor}`,
      padding: '.5rem',
      display: 'flex',
    },
    content: {
      flex: '1 1 auto',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1),
      },
    },
    send: {
      height: '100%'
    },
  }
}

export default ({
  updateMessages,
  channel,
}) => {
  const [content, setContent] = useState('')
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const onSubmit = async () => {
    await axios.post(`http://localhost:3001/channels/${channel.id}/messages`,
    {
      content: content,
    },
    {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    updateMessages()
    setContent('')
  }
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
      <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        rowsMax={4}
        value={content}
        onChange={handleChange}
        variant="outlined"
        css={styles.content}
      />
      <div>
        <Button
          variant="contained"
          color="secondary"
          css={styles.send}
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </form>
  )
}
