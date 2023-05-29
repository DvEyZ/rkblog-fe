import React, { useEffect, useState } from 'react';
import { ApiContext, actualApiContext } from '../ApiContext';
import * as jose from 'jose';

import './App.css';
import { Main } from './Main';
import { IUserModel } from '../Users/IUserModel';

const userFromToken = (token :string | undefined) :IUserModel | undefined => {
    if(!token) return undefined;

    let c = jose.decodeJwt(token);
    return {
        name: String(c.name),
        permissions: String(c.permissions)
    }
} 

export const App = (props :{}) => {
    const [token, setToken] = useState<string>();

    useEffect(() => {
        setToken(localStorage.getItem('token')?.toString())
    }, [])

    return(
        <div>
            <h1 style={{marginBottom:'0.5rem'}}>RkBlog</h1>
            <ApiContext.Provider value={{
                url: actualApiContext.url, 
                token: token, 
                user: userFromToken(token),
                setToken: (t :string) => {
                    localStorage.setItem('token', t);
                    setToken(t);
                },
                dropToken: () => {
                    localStorage.removeItem('token');
                    setToken(undefined);
                }
            }}>
                <Main/>
            </ApiContext.Provider>
        </div>
    )
}