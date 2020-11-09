/** @jsx jsx */
import { jsx } from '@emotion/core';

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
        backgroundColor: '#66728E',
        border: '1px solid white',
        borderRadius: '10px',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,.2)',
        },
    }
}

export default ({
    channel = {
        name: 'Fake channel'
    },
    messages
}) => {
    return (
        <div css={styles.messages}>
            <h1>Messages for {channel.name}</h1>
            <ul>
                {   messages.map((message, i) => (
                    <li key={i} >
                        <p>
                            <span>{message.author}</span>
                            {' '}
                            <span>{(new Date(message.creation)).toString()}</span>
                        </p>
                        <div css={styles.message}>
                            {
                                message.content
                                    .split(/(\n +\n)/)
                                    .filter(el => el.trim())
                                    .map(el => <p>{el}</p>)
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
