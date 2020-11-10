/** @jsx jsx */
import { jsx } from '@emotion/core';

import './App.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";


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
    return (
        <div className="App" css={styles.root}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
