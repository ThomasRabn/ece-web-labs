/** @jsx jsx */
import { jsx } from '@emotion/core';

import Channel from './Channel.js';
import Channels from './Channels.js';


const styles = {
    main: {
        backgroundColor: '#373B44',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
    }
}

export default () => {
    return (
        <main className="App-main" css={styles.main}>
            <Channels/>
            <Channel/>
        </main>
    );
}