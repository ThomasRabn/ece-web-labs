import { useContext,useEffect } from 'react'
import axios from 'axios'
import {
  useHistory
} from 'react-router-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Style
import { useTheme } from '@material-ui/core/styles'
// Core component
import {
  Grid, Link, Typography
} from '@material-ui/core'
// Local
import {ReactComponent as ChannelIcon} from './icons/channel.svg'
import {ReactComponent as FriendsIcon} from './icons/friends.svg'
import {ReactComponent as SettingsIcon} from './icons/settings.svg'
import CreateChannel from './CreateChannel'
import InviteFriends from './InviteFriends'
import Context from './Context'

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

/******** Welcome/Home Page ********/
export default () => {
  const { oauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const history = useHistory();
  // Create account if does not exist
  useEffect( () => {
    const fetchUser = async () => {
      try{
        const {data: account} = await axios.get(`http://localhost:3001/useremails/`+oauth.email,
        {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
        })
        if(!account) {
          history.push('/register')
        }
      }catch(err){
        console.error(err)
      }
    }
    fetchUser()
  })
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
