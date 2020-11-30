import React, { createContext } from 'react';

export const Context = createContext();

export default ({
    children
}) => {
    
    return (
        <Context.Provider value={{test: 'hello'}}>{children}</Context.Provider>
    )
}