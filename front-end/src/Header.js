
import { useContext } from 'react'
import {useHistory} from 'react-router-dom'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Styles
import { useTheme } from '@material-ui/core/styles'
// Core components
import {
  Button, IconButton, Avatar, Grid
} from '@material-ui/core';
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
// Local
import Context from './Context'

const useStyles = (theme) => ({
  header: {
    height: '3em',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    flexShrink: 0,
  },
  toRight: {
    float: 'right',
    marginRight: '1em',
  },
  verticallyCenter: {
    width : '25em',
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
  const history = useHistory()
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
          <Grid container direction="row" xs={12} justify="space-between">
            <Grid container xs={5} alignItems="center">
              <Grid item>
                <Avatar alt="Profil" src={`http://127.0.0.1:3001/${oauth.email}.png`} />
              </Grid>
              <Grid xs={1}/>
              <Grid item> { oauth.email}</Grid>
            </Grid>
            <Grid container xs={2} justify="center">
              <IconButton
                href={`/channels`}
                onClick={ (e) => {
                  e.preventDefault()
                  history.push(`/channels`)
                }}
              >
                <HomeIcon />
              </IconButton> 
            </Grid>
            <Grid container xs={5} justify="flex-end">
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ExitToAppIcon />}
                onClick={onClickLogout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        :
          <span></span>
      }
    </header>
  );
}
