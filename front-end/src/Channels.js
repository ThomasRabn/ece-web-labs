/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
const axios = require('axios');


const styles = {
    channels: {
        minWidth: '200px'
    },
    textChannel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2em'
    }
}

export default () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('http://localhost:3001/channels');
            data = data.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            })
            setChannels(data);
        }
        fetchData();
    }, [])
    return (
        <div css={styles.channels}>
            <ul>
                {channels.map((channel, i) => (
                    <li key={i}>
                        <a css={styles.textChannel} href='http://localhost:3000/'>{channel.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}