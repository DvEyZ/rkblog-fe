import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../ApiContext";
import { IUserModel } from "../IUserModel";
import { UserBrief } from "./UserBrief";
import { ErrorDisplay } from "../../Error/ErrorDisplay";
import { Link } from "react-router-dom";

export const UserIndex = (props :{}) => {
    const context = useContext(ApiContext)!;

    let [users, setUsers] = useState<IUserModel[]>();
    let [error, setError] = useState<Error>();
    
    useEffect(() => {
        fetch(`${context.url}/users`, {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        }).then(async (res) => {
            if(res.status === 401) context.dropToken();
            if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            return res.json()
        }).then((v) => {
            setUsers(v);
        }).catch((e) => {
            setError(e);
        })
    }, [context, context.url])

    if(error) return <ErrorDisplay error={error}/>
    if(!users) return <>Loading...</>

    return(
        <div>
            <h2>👤 Users</h2>
            <hr/>
            {
                context.user?.permissions === 'Admin' &&
                <>(<Link to='@new'>new</Link>)</>
            }
            {
                users.map((v,i) => <UserBrief key={i} name={v.name} permissions={v.permissions}/>)
            }
        </div>
    );
}