import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
// Styles
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
// Local
import './index.css'
import App from './App'
import { Provider as ContextProvider } from './Context'
import * as serviceWorker from './serviceWorker'
// Font
import 'typeface-roboto'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#3f50b5',
      main: '#fff',
      dark: '#002884',
      contrastText: '#000',
    },
    secondary: {
      light: '#e57373',
      main: '#ff7043',
      dark: '#ff5030',
      contrastText: '#fff',
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
