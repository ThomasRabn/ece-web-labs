/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import Messages from './Messages.js';
import MessageSend from './MessageSend.js';

const axios = require('axios');

const styles = {
    channel: {
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    messages: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
        '& ul': {
            'margin': 0,
            'padding': 0,
            'textIndent': 0,
            'listStyleType': 0,
        },
    },
    message: {
        margin: '.2rem',
        padding: '.2rem',
        // backgroundColor: '#66728E',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,.2)',
        },
    }
}

export default ({
    channel
}) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const fetchMessages = async() => {
            let channelGet = await axios.get('http://localhost:3001/channels/');
            let occurence = channelGet.data.find(arr => {
                return arr.name === channel.name
            });
            if(occurence) {
                let response = await axios.get('http://localhost:3001/channels/'+occurence.id+'/messages');
                setMessages(response.data);
            }
        };
        fetchMessages();
    }, [channel.name]);

    const addMessage = async (message) => {
        setMessages([
            ...messages,
            message
        ]);
        let channelGet = await axios.get('http://localhost:3001/channels/');
        let occurence = channelGet.data.find(arr => {
            return arr.name === channel.name
        })
        console.log(occurence);
        if(!occurence) {
            // On rentre dedans uniquement si le channel n'existe pas
            occurence = await axios.post('http://localhost:3001/channels/', channel);
        }
        await axios.post('http://localhost:3001/channels/' + occurence.id + '/messages', message);
    }

    return (
        <div css={styles.channel}>
            <Messages messages={messages} channel={channel} />
            <MessageSend addMessage={addMessage} />
        </div>
    );
}