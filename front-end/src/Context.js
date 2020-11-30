import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export const Context = createContext();

export default ({
    children
}) => {
    const [oauth, setOauth] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    return (
        <Context.Provider value={{
            oauth: oauth,
            setOauth: () => {
                if(oauth) {
                    const { id_token } = oauth;
                    const id_payload = id_token.split('.')[1];
                    const { email } = JSON.parse(atob(id_payload));
                    setCookie('oauth', oauth);
                } else {
                    removeCookie('oauth');
                }
                setOauth(oauth);
            }
        }}
        >{children}</Context.Provider>
    )
}