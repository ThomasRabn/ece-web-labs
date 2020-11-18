/** @jsx jsx */
import { jsx } from '@emotion/core';
import {useState } from 'react';

import Channel from './Channel.js';
import Channels from './Channels.js';
import Welcome from './Welcome';


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
    const [channel, setChannel] = useState(null)
    const fetchChannel = async (channel) => {
        setChannel(channel)
    }
    return (
        <main css={styles.main}>
            <Channels onChannel={fetchChannel} />
            {channel ? <Channel channel={channel} messages={[]} /> : <Welcome />}
        </main>
    );
}