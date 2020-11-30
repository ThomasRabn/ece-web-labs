/** @jsx jsx */
import { jsx } from '@emotion/core'
// Core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// Icons 
import Send from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { Route, Router, Link } from 'react-router-dom';
// Layout
import { useTheme } from '@material-ui/core/styles';

const crypto = require('crypto');

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

const handler = () => {
    const authorization_endpoint = "http://127.0.0.1:5556/dex/auth";
    const client_id = "example-app";
    const redirect_uri = "http://127.0.0.1:5555/callback";
    const scope = "openid%20email%20offline_access";
    const code_verifier = base64URLEncode(crypto.randomBytes(32));
    console.log(code_verifier);
    const code_challenge = base64URLEncode(sha256(code_verifier));
    const url = authorization_endpoint+"?client_id="+client_id+"&scope="+scope
                +"&response_type=code&redirect_uri="+redirect_uri+"&code_challenge="+code_challenge
                +"&code_challenge_method=S256";
    const data = {
        code_verifier: code_verifier,
        url: url
    }
    console.log(JSON.stringify(data, null, 2)); 
    console.log('\n\n');
    return data;
}

const onRegister = () => {
    const loginValue = handler();
    console.log(loginValue);
    this.props.history.push(loginValue.url);
};

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

export default ({
    onUser
}) => {
    const styles = useStyles(useTheme());
    const linkToLogin = handler();
    console.log("Link to login :");
    console.log(linkToLogin);
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
                            href={linkToLogin.url}
                            // onClick={(e) => {
                            //     e.stopPropagation();
                            //     onRegister();
                            //     //     //onUser({ username: 'david'})
                            // }}
                        >
                            Login
                    </Button> 
                </div>

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
    );
}