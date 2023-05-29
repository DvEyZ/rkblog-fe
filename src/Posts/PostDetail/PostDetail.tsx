import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import { IPostFullModel } from "../IPostModel";
import { ErrorDisplay } from "../../Error/ErrorDisplay";

export const PostDetail = (props :{}) => {
    const { title } = useParams();
    const context = useContext(ApiContext)!;

    const [post, setPost] = useState<IPostFullModel>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<string | undefined>();

    useEffect(() => {
        fetch(`${context.url}/posts/${title}`, {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        }).then(async (res) => {
            if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            return res.json();
        }).then((v) => {
            setPost(v);
        }).catch((e) => {
            setError(e);
        })
    }, [context.url, context.token, title]);

    const handleDelete = () => {
        let c = window.confirm(`Do you really want to delete post "${title}"?`);

        if(!c) return;

        fetch(`${context.url}/posts/${title}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`
            },
        }).then(async (res) => {
            if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
        }).then(() => {
            setRedirect('..');
        }).catch((e) => {
            alert(e.message)
        })
    }

    if(redirect) return <Navigate to={redirect}/>
    if(error) return <ErrorDisplay error={error}/>
    if(!post) return <>Loading...</>

    return(
        <div>
            <h2>📃 <Link to={`/users/${post.author.name}`}>@{post.author.name}</Link>/{post.title}</h2>
            <Link to='..'>&lt;&lt;&lt; Back</Link>
            {
                ((post.author.name === context.user?.name) || (context.user?.permissions === 'Admin')) &&
                <>
                    <> </>
                    (<Link to='edit'>edit</Link>, 
                    <button className="action-button" onClick={() => {handleDelete()}}>delete</button>)
                </>
            }
            <hr/>
            <div style={{whiteSpace:'pre-wrap'}}>
                {post.content}
            </div>
        </div>
    )
}