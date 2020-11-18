/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRef, useEffect } from 'react';
const { DateTime } = require("luxon");

const styles = {
    messages: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
        '& ul': {
            'margin': 1,
            'padding': 0,
            'textIndent': 0,
            'listStyleType': 0,
        },
    },
    message: {
        margin: '.2rem',
        padding: '.2rem',
        backgroundColor: '#66728E',
        border: '1px solid white',
        borderRadius: '10px',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,.2)',
        },
    },
    marged: {
        marginLeft: 20,
    }
}

export default ({
    messages,
    channel
}) => {
    const styleDate = {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit'}
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [messages]);

    const printMessages = (e) => {
        return (
            messages.map((message, i) => (
                <li key={i} >
                    <p>
                        <span>{message.author}</span>
                        {' - '}
                        {
                            //<span>{(new DateTime.fromISO((new Date(message.creation)).toISOString())).setLocale('en-GB').toLocaleString(styleDate)}</span>
                        }
                    </p>
                    <div css={styles.message}>
                        {
                            message.content
                                .split(/(\n +\n)/)
                                .filter(el => el.trim())
                                .map((el, i) => <p key={i}>{el}</p>)
                        }
                    </div>
                </li>
            ))
        );
    }

    const emptyScreen = (e) => {
        return (
            <h1 css={styles.marged}>There is no message in this channel</h1>
        )
    }
    return (
        <div css={styles.messages}>
            <h1 css={styles.marged}>Messages for {channel.name}</h1>
            <ul>
                {
                    messages.length > 0 ? printMessages() : emptyScreen()
                }
            </ul>
            <div ref={messagesEndRef} />
        </div>
    )
}
