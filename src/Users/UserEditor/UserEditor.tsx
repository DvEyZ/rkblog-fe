import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { IUserModel } from "../IUserModel";
import { ErrorDisplay } from "../../Error/ErrorDisplay";

export const UserEditor = (props :{}) => {
    const { name } = useParams();
    const context = useContext(ApiContext)!;

    const [user, setUser] = useState<IUserModel>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<string | undefined>();

    useEffect(() => {
        if(name)
        {
            fetch(`${context.url}/users/${name}`, {
                headers: {
                    'Authorization': `Bearer ${context.token}`
                }
            }).then(async (res) => {
                if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
                return res.json();
            }).then((res) => {
                setUser(res);
            }).catch((e) => {
                setError(e);
            })
        }
        else
        {
            setUser({
                name: '',
                permissions: 'User'
            })
        }
    }, [context.url, context.token, name]);

    const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let form = new FormData(e.currentTarget);

        let data = {
            name: form.get('name')!.toString(),
            password: form.get('password')!.toString(),
            permissions: form.get('permissions')!.toString()
        };

        let reqParams = name ? {
            url: `${context.url}/users/${name}`,
            method: 'PUT'
        } : {
            url: `${context.url}/users`,
            method: 'POST'
        };

        fetch(reqParams.url, {
            method: reqParams.method,
            headers: {
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if(res.status >= 400) alert(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            else setRedirect(`../${data.name!.toString()}`)
        }).catch((e) => {
            alert(e.message);
        })
    }

    if(redirect) return <Navigate to={redirect}/>
    if(error) return <ErrorDisplay error={error}/>
    if(!user) return <>Loading</>

    return(
        <div>
            <h2>👤 {name ? 'Edit' : 'Create' } user</h2>
            <Link to='..'>&lt;&lt;&lt; Back</Link>
            <hr/>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label htmlFor='name'>Username: </label>
                    <input name="name" id="name" required pattern="[0-9a-zA-Z\-_]+" defaultValue={user.name}/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password" id="password" required/>
                </div>
                <div>
                    <label htmlFor='permissions'>Permissions: </label>
                    <select name="permissions" id="permissions" defaultValue={user.permissions}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}