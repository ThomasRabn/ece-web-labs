
import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Styles
import { useTheme } from '@material-ui/core/styles'
// Core components
import {
  Button, IconButton, Avatar
} from '@material-ui/core';
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
// Local
import Context from './Context'

const useStyles = (theme) => ({
  header: {
    height: '2em',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    flexShrink: 0,
  },
  toRight: {
    float: 'right',
    marginRight: '1em',
  },
  verticallyCenter: {
    marginTop: '0.5em',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  }
})

export default ({
  drawerToggleListener
}) => {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {
        oauth ?
          <div style={{width: '100%'}}>
            <div style={{float: 'left'}} css={styles.verticallyCenter}>
              <Avatar alt="Profil" src="./image/thomsko.png" />
              {oauth.email}
              </div>
            <div css={styles.toRight}>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ExitToAppIcon />}
                onClick={onClickLogout}
              >
                Logout
              </Button>
            </div>
            <div style={{margin: '0 auto'}}></div>
          </div>
        :
          <span></span>
      }

    </header>
  );
}
