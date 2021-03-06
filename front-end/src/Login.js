import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom'
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Style
import { useTheme } from '@material-ui/core/styles'
// Core components
import { Link, Button } from '@material-ui/core/'
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle'
// Local
import Context from './Context'

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
      flex: '1 1 auto',
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
  welcomeTitle: {
      fontSize: 50,
      margin: 0,
      fontWeight: '400',
  },
  loginTitle: {
      fontStyle: 'italic',
      fontWeight: '300',
  }
});

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
    <div css={styles.root}>
      <div css={styles.centered}>
        <div style={{ textAlign: 'center' }}>
          <h1 css={styles.welcomeTitle}>Welcome</h1>
          <h2 css={styles.loginTitle}>Please log in</h2>
          <Button
            type="input"
            variant="contained"
            color="secondary"
            endIcon={<AccountCircle />}
            onClick={redirect}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

const Tokens = ({
  oauth
}) => {
  const {setOauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

export default () => {
  const styles = useStyles(useTheme())
  const history = useHistory();
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
    token_endpoint: 'http://127.0.0.1:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://127.0.0.1:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url
  if(!code){ // no: we are not being redirected from an oauth server
    if(!oauth){
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      console.log(codeVerifier)
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    } else { // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  } else { // yes: we are coming from an oauth server
    console.log(cookies)
    const codeVerifier = cookies.code_verifier
    useEffect( () => {
      const fetch = async () => {
        try {
          const {data} = await axios.post(
            config.token_endpoint
          , qs.stringify ({
            grant_type: 'authorization_code',
            client_id: `${config.client_id}`,
            code_verifier: `${codeVerifier}`,
            redirect_uri: `${config.redirect_uri}`,
            code: `${code}`,
          }))
          setOauth(data)
          removeCookie('code_verifier')
          // window.location = '/'
          history.push('/')
        }catch (err) {
          console.error(err)
        }
      }
      fetch()
    })
    return (
      <div css={styles.root}>Loading tokens</div>
    )
  }
}
