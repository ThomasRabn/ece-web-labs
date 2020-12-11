import {} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {ReactComponent as ChannelIcon} from './icons/channel.svg'
import {ReactComponent as FriendsIcon} from './icons/friends.svg'
import {ReactComponent as SettingsIcon} from './icons/settings.svg'
import CreateChannel from './CreateChannel'
import InviteFriend from './InviteFriend'

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
  const styles = useStyles(useTheme())
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
          <InviteFriend>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </InviteFriend>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
