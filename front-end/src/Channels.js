import {useContext, useEffect} from 'react'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import Link from '@material-ui/core/Link'
// Local
import Context from './Context'
import {useHistory} from 'react-router-dom'

const styles = {
  channels: {
    paddingRight: '1em',
    paddingLeft: '1em',
    paddingTop: '1em'
  },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2em'
  }
}

export default () => {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const history = useHistory();
  useEffect( () => {
    const fetch = async () => {
      try{
        let {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        channels = channels.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul style={styles.channels}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              history.push(`/channels/${channel.id}`)
            }}
            style={{color: 'white'}}
          >
            {channel.name}
          </Link>
        </li>
      ))}
      <li key='58778998525205zfzzgzgzeg20' css={styles.channel}>
        <Link
          href={`/channels/creation`}
          onClick={ (e) => {
            e.preventDefault()
            history.push(`/channels/creation`)
          }}
          style={{color: 'white'}}
        >
          Add a channel
        </Link>
      </li>
    </ul>
  );
}
