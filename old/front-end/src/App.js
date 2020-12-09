import {useState} from 'react'
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'

const styles = {
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#565E71',
        padding: '0',
    }
}



export default () => {
    const [user, setUser] = useState(null)
    const display = (e) => {
        if(user) {
            return (
                <div className="App" css={styles.root}>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            )
        } else {
            return (
                <div className="App" css={styles.root}>
                    <Login onUser={setUser}/>
                    <Footer />
                </div>
            )
        }
    }
    return display();
}