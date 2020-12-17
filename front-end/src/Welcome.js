import { useContext } from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// Local
import {ReactComponent as ChannelIcon} from './icons/channel.svg'
import {ReactComponent as FriendsIcon} from './icons/friends.svg'
import {ReactComponent as SettingsIcon} from './icons/settings.svg'
import CreateChannel from './CreateChannel'
import InviteFriends from './InviteFriends'
import Context from './Context'
import Link from '@material-ui/core/Link'


import {
  useHistory
} from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
  }
})

export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const history = useHistory();
  // Create account if does not exist
  const { data: account } = axios.get(`http://localhost:3001/useremails/`+oauth.email)
  if(!account) {
    // TODO: create a form for the user to create an account
    const {data: answer} = axios.post(`http://localhost:3001/users/`,
      {
        username: "Thomas",
        email: oauth.email,
      },
      {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      }
    )
    console.log(answer)
  }
  return (
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <CreateChannel>
              <ChannelIcon css={styles.icon} />
              <Typography color="textPrimary">
                Create channels
              </Typography>
            </CreateChannel>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <InviteFriends>
              <FriendsIcon css={styles.icon} />
              <Typography color="textPrimary">
                Invite friends
              </Typography>
            </InviteFriends>

          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
          <Link
            href={`/settings`}
            onClick={ (e) => {
              e.preventDefault()
              history.push(`/settings`)
            }}
            style={{color: 'white'}}
          >
           <SettingsIcon css={styles.icon} />
              <Typography color="textPrimary">
                Settings
              </Typography>
          </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
