/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
const axios = require('axios');


const styles = {
    channels: {
        minWidth: '200px',
    }
}

// function getChannels() {
//     var value;
//     axios.get('localhost:3001/channels')
//         .then((response) => {
//             value = response;
//         });
//     return value;
// }

export default () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('localhost:3001/channels', {
                headers: {
                    'Access-Control-Allow': '*',
                    'Access-Control-Allow-Credentials': 'true'
                }
            });
            console.log(data);
            setChannels(data);
        }
        fetchData();
    }, [])
    return (
        <div css={styles.channels}>
            <ul>
                {channels.map((channel, i) => (
                    <li key={i}>
                        <a href='localhost:3000/'>{channel.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}