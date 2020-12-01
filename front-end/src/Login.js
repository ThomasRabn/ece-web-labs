/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCookies} from 'react-cookie';
import { useContext, useEffects } from 'react';
// Core
import Button from '@material-ui/core/Button';
// Icons 
import AccountCircle from '@material-ui/icons/AccountCircle';
import qs from 'qs';
import axios from 'axios';
import crypto from 'crypto';
// Layout
import { useTheme } from '@material-ui/core/styles';
import { Context } from './Context';

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
        .digest();
}

const Redirect = () => {
    const config = {
        authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
        client_id: 'example-app',
        redirect_uri: 'http://127.0.0.1:3000',
        scope: 'openid%20email%20offline_access',
    }
    const [cookies, setCookie, removeCookie] = useCookies();
    const code_verifier = base64URLEncode(crypto.randomBytes(32));
    const styles = useStyles(useTheme());
    const redirect = () => {
        const code_challenge = base64URLEncode(sha256(code_verifier));
        setCookie('code_verifier', code_verifier);
        const url = config.authorization_endpoint+"?client_id="+config.client_id+"&scope="+config.scope
                +"&response_type=code&redirect_uri="+config.redirect_uri+"&code_challenge="+code_challenge
                +"&code_challenge_method=S256";
        window.location = url;
    }
    return (
        <div css={styles.root}>
            <div css={styles.centered}>
                <div style={{textAlign: 'center'}}>
                    <h1 css={styles.welcomeTitle}>Welcome</h1>
                    <h2 css={styles.loginTitle}>Please log in</h2>
                    <Button
                            type="input"
                            variant="contained"
                            color="secondary"
                            endIcon={<AccountCircle/>}
                            onClick={redirect}
                        >
                            Login
                    </Button> 
                    {/* <fieldset>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="username" name="username" label="Username" />
                        </Grid>
                    </Grid>
                </fieldset>
                <fieldset>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                css={styles.root}
                            />
                        </Grid>
                    </Grid>
                    
                </fieldset>
                <fieldset style={{display: "flex"}}>
                    <Button
                        style={{marginLeft: "auto"}}
                        type="input"
                        variant="contained"
                        color="secondary"
                        endIcon={<Send/>}
                        onClick={(e) => {
                            e.stopPropagation()
                            onUser({ username: 'david' })
                        }}
                    >
                        Send
                    </Button>
                </fieldset> */}
                </div>
            </div>
        </div>
    )
}



const CodeGrant = ({
    params: {
        client_id, token_endpoint,
        redirect_uri, code_verifier, code
    }
}) => {
    const codeGrant = async () => {
        try {
            const data = await(axios.post(token_endpoint, qs.stringify({
                grant_type: 'authorization_code',
                client_id: client_id,
                redirect_uri:  redirect_uri,
                code_verifier: code_verifier,
                code: code
            }))).data;
            console.log(JSON.stringify(data, null, 2));
            return data;
        } catch (err) {
            console.log(JSON.stringify(err.response.data, null, 2));
        }
    }
}

// const Token = ({
//     oauth
// }) => {
//     const [,, removeCookie] = useCookies([]);
//     const styles = useStyles(useTheme());
//     const logout = (e) => { 
//         e.stopPropagation();
//         removeCookie('oauth');
//     }
//     return (
//         <div css={styles.root}>
//             Welcome {email} {/*<Link onClick={logout} color='secondary'>Logout</Link> */}
//         </div>
//     )
// }


export default ({
    onUser
}) => {
    const styles = useStyles(useTheme());
    const { oauth, setOauth } = useContext(Context);

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if(!code) { // We are not redirected from an Oauth server 
        if(!oauth) { // If the user is not connected
            return Redirect();
        } else {
            // The user is connected, great!

        }
    } else {
        
    }

    return (
        <div css={styles.root}>
            <div css={styles.centered}>
                <div style={{textAlign: 'center'}}>
                    <h1 css={styles.welcomeTitle}>Welcome</h1>
                    <h2 css={styles.loginTitle}>Please log in</h2>
                    <Button
                            // style={{marginLeft: "auto"}}
                            type="input"
                            variant="contained"
                            color="secondary"
                            endIcon={<AccountCircle/>}
                        >
                            Login
                    </Button> 
                </div>
            </div>
        </div>
    );
}