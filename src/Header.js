/** @jsx jsx */
import { jsx } from '@emotion/core';

const styles = {
    header: {
        height: '60px',
        backgroundColor: 'black',
        flexShrink: 0,
    }
}

export default () => {
    return (
        <header className="App-header" css={styles.header}>
            <h1>User</h1>
        </header>
    );
}
