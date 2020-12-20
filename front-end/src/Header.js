
import { useState,useContext } from 'react'
import axios from 'axios'
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
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const [users, setUsers] = useState()
  // const [images, setImages] = useState()
  const [path,setPath] = useState('thomsko.jpeg')
  const fetch = async () => {
    try {
      const { data: usersResponse } = axios.get(`http://localhost:3001/useremails/${oauth.email}`, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      })
      setUsers(usersResponse)
      console.log('hello' + users)
      const { data: imagesResponse } = axios.get(`http://localhost:3001/images/${users.id}`, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        },
      })
      setPath(imagesResponse.name)
      console.log(path)
    } catch (err) {
      console.error(err)
    }
  }
  if(path === '')
    fetch()
  //console.log(path)
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
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <Avatar alt="Profil" src={{
                      uri: path,
                      cache: 'only-if-cached'
                    }} />
                  </Grid>
                  <Grid item xs> {oauth.email}</Grid>
                </Grid>
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
