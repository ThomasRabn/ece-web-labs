/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
const axios = require('axios');


const styles = {
    channels: {
        backgroundColor: '#303030',
        minWidth: '200px'
    },
    textChannel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2em'
    }
}

export default ({
    onChannel
}) => {
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
    }, []);
    return (
        <div css={styles.channels}>
            <ul>
                {channels.map((channel, i) => (
                    <li key={i}>
                        <a css={styles.textChannel}  
                        onClick={ (e) => {
                            e.preventDefault();
                            onChannel(channel);
                        }} 
                        href={'http://localhost:3000/' + channel.id}>
                            {channel.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}