import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { ErrorDisplay } from "../../Error/ErrorDisplay";
import { IUserFullModel } from "../IUserModel";

export const UserDetail = (props :{}) => {
    const context = useContext(ApiContext)!;
    const { name } = useParams();

    const [user, setUser] = useState<IUserFullModel>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<string | undefined>();

    useEffect(() => {
        fetch(`${context.url}/users/${name}`, {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        }).then(async (res) => {
            if(res.status === 401) context.dropToken();
            if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            return res.json();
        }).then((v) => {
            setUser(v);
        }).catch((e) => {
            setError(e);
        })
    }, [context, name]);

    const handleDelete = () => {
        let c = window.confirm(`Do you really want to delete user ${name}?`)
        if(!c) return;
        
        fetch(`${context.url}/users/${name}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        }).then(async (res) => {
            if(res.status === 401) context.dropToken();
            if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            setRedirect('..');
        }).catch((e) => {
            alert(e.message)
        })
    }
    
    if(redirect) return <Navigate to={redirect}/>
    if(error) return <ErrorDisplay error={error}/>
    if(!user) return <>Loading...</>

    return(
        <div>
            <h2>👤 {user.name} {user.permissions === 'Admin' && <i>(Admin)</i>}</h2>
            <Link to='..'>&lt;&lt;&lt; Back</Link>
            {
                context.user?.permissions === 'Admin' &&
                <> (<Link to='edit'>edit</Link>
                    {context.user.name !== user.name && <>,<button className="action-button" onClick={() => {handleDelete()}}>delete</button></>})</>
            }
            <hr/>
            <div>
                <b>About:</b>
                <div className="content" style={{whiteSpace:'pre-wrap', wordWrap:'break-word'}}>
                    {user.bio}
                </div>
            </div>
        </div>
    )
}