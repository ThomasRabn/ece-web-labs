/** @jsx jsx */
import { jsx } from '@emotion/core';
const { DateTime } = require("luxon");

const styles = {
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
    value,
    messages = value.messages,
    channel = value.channel,
    styleDate = {weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit'}
}) => {
    return (
        <div css={styles.messages}>
            <h1>Messages for {channel.name}</h1>
            <ul>
                {   messages.map((message, i) => (
                    <li key={i} css={styles.message}>
                        <p>
                            <span>{message.author}</span>
                            {' - '}
                            <span>{(new DateTime.fromISO((new Date(message.creation)).toISOString())).setLocale('en-GB').toLocaleString(styleDate)}</span>
                        </p>
                        <div>
                            {
                                message.content
                                    .split(/(\n +\n)/)
                                    .filter(el => el.trim())
                                    .map((el, i) => <p key={i}>{el}</p>)
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}