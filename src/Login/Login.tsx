import React, { useContext } from "react";
import { ApiContext } from "../ApiContext";

export const Login = (props :{}) => {
    let context = useContext(ApiContext)!;

    const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let form = new FormData(e.currentTarget);

        let data = {
            name: form.get('username')!.toString(),
            password: form.get('password')!.toString()
        }

        fetch(`${context.url}/auth`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (res) => {
            if(res.status >= 400) throw new Error(`Login failed with status ${res.status}: ${(await res.json()).message}`)
            return res.json()
        }).then((v) => {
            context.setToken(v.token);
        }).catch((e) => {alert(e.message)})
    }

    return(
        <div>
            <h2>🔑 Log in</h2>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <input type="submit" value="Log in"/>
            </form>
        </div>
    )
}