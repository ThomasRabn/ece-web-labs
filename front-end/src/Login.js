import { } from 'react';
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
// Layout
import { useTheme } from '@material-ui/core/styles';

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
    const styles = useStyles(useTheme())
    return (
        <div css={styles.root}>
            <div css={styles.centered}>
                <div style={{textAlign: 'center'}}>
                    <h1 css={styles.welcomeTitle}>Welcome</h1>
                    <h2 css={styles.loginTitle}>Please log in</h2>
                </div>

                
                <fieldset>
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
                </fieldset>
            </div>
        </div>
    );
}