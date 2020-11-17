/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';

import 'typeface-roboto';


const styles = {
    form: {
        borderTop: '2px solid #373B44',
        padding: '.5rem',
        display: 'flex',
        '& .MuiTextField-root': {
            marginRight: '.5rem',
        }
    },
    content: {
        flex: '1 1 auto',
        color: 'white'
    },
    send: {
        backgroundColor: '#D6DDEC',
        padding: '.2rem .5rem',
        border: 'none',
        ':hover': {
            backgroundColor: '#2A4B99',
            cursor: 'pointer',
            color: '#fff',
        },
    },
}

export default ({
    addMessage
}) => {
    const classes = styles
    const [content, setContent] = useState('');
    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        addMessage({
            content: data.get('content'),
            author: 'david',
            creation: Date.now(),
        })
        setContent('')
    }
    const handleChange = (e) => {
        setContent(e.target.value);
    }
    return (
        <form css={styles.form} onSubmit={onSubmit}>
            <TextField
                id="outlined-multiline-flexible"
                type="input"
                name="content"
                InputProps={{
                    className: classes.content
                }}
                label="Message"
                multiline
                rowsMax={4}
                value={content}
                onChange={handleChange}
                variant="outlined"
                css={styles.content}
            
            />
            <Button
                type="input"
                variant="contained"
                color="primary"
                endIcon={<Send/>}
            >
                Send
            </Button>
        </form>
    );
}