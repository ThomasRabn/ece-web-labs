import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import { Provider as ContextProvider } from './Context';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto'
// Layout
import { createMuiTheme, ThemeProvider, withTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
} from "react-router-dom";

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
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  }
});

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
