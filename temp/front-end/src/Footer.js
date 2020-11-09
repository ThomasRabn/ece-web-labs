/** @jsx jsx */
import { jsx } from '@emotion/core';


const styles = {
    footer: {
        height: '30px',
        backgroundColor: 'black',
        flexShrink: 0,
    }
}

export default () => {
    return (
        <footer className="App-footer" style={styles.footer}>
            footer
        </footer>
    );
}
