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
import Link from '@material-ui/core/Link'
// Popup
import Popup from 'reactjs-popup';

const styles = {
  channels: {
    paddingRight: '1em',
    paddingLeft: '1em',
    paddingTop: '1em'
  },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  modal: {
    background: '#fff',
    backgroundColor: '#fff',
    border: '1px solid #fff'
  }
}

export default () => {
  const styles = useStyles(useTheme())
  const contentStyle = { background: useTheme().palette.background.default };
  const overlayStyle = { background: 'rgba(0,0,0,0.7)' };
  return (
    <Popup
      trigger={
        <Link
          href={`#`}
          style={{color: 'white'}}
        >
          Add a channel
        </Link>
      }
      modal
      nested
      contentStyle={contentStyle}
      overlayStyle={overlayStyle}
    >
          <div css={styles.root}>
            <div>
              <div style={{ textAlign: 'center', margin: '0 0 0 0' }}>
                <h1 css={styles.welcomeTitle}>Create a new channel</h1>
                <h3>Please enter its information</h3>
              </div>
              <fieldset>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <TextField id="name" name="name" label="Channel name" variant="filled" />
                  </Grid>
                </Grid>
              </fieldset>
              <fieldset>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <TextField id="people" name="people" label="People to invite" variant="filled" />
                  </Grid>
                </Grid>
              </fieldset>
              <fieldset style={{ display: "flex" }}>
                <Button
                  style={{ marginLeft: "auto" }}
                  type="input"
                  variant="contained"
                  color="secondary"
                  endIcon={<Send />}
                >
                  Send
                </Button>
              </fieldset>
            </div>
          </div>
    </Popup>
  )
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
});

// export default () => {
//   const styles = useStyles(useTheme())
//   return (
//     <div css={styles.root}>
//       <div>
//         <div style={{ textAlign: 'center' }}>
//           <h1 css={styles.welcomeTitle}>Welcome</h1>
//           <h3>Please log in</h3>
//         </div>
//         <fieldset>
//           <Grid container spacing={1} alignItems="flex-end">
//             <Grid item>
//               <AccountCircle />
//             </Grid>
//             <Grid item>
//               <TextField id="username" name="username" label="Username" />
//             </Grid>
//           </Grid>
//         </fieldset>
//         <fieldset>
//           <Grid container spacing={1} alignItems="flex-end">
//             <Grid item>
//               <LockIcon />
//             </Grid>
//             <Grid item>
//               <TextField
//                 id="password"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 autoComplete="current-password"
//                 css={styles.root}
//               />
//             </Grid>
//           </Grid>
//         </fieldset>
//         <fieldset style={{ display: "flex" }}>
//           <Button
//             style={{ marginLeft: "auto" }}
//             type="input"
//             variant="contained"
//             color="secondary"
//             endIcon={<Send />}
//           >
//             Send
//           </Button>
//         </fieldset>
//       </div>
//     </div>
//   );
// }