/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import { Context } from './Context';

const styles = {
    header: {
        height: '60px',
        backgroundColor: '#151515',
        flexShrink: 0,
        textAlign: 'center'
    }
}

export default (

) => {
    return (
        <header className="App-header" css={styles.header}>
            <h1>Welcome to this chat</h1>
        </header>
    );
}
