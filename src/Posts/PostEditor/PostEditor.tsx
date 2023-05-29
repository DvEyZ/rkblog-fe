import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../ApiContext";
import { IPostUploadModel } from "../IPostModel";
import { Link, Navigate, useParams } from "react-router-dom";
import { ErrorDisplay } from "../../Error/ErrorDisplay";

export const PostEditor = (props :{}) => {
    const { title } = useParams();
    const context = useContext(ApiContext)!;
    
    const [post, setPost] = useState<IPostUploadModel>();
    const [error, setError] = useState<Error>();
    const [redirect, setRedirect] = useState<string | undefined>();
    
    useEffect(() => {
        if(title)
        {
            fetch(`${context.url}/posts/${title}`, {
                headers: {
                    'Authorization': `Bearer ${context.token}`
                }
            }).then(async (res) => {
                if(res.status === 401) context.dropToken();
                if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
                return res.json();
            }).then((v) => {
                setPost({
                    title: v.title,
                    content: v.content
                })
            }).catch((e) => {
                setError(e);
            })
        }
        else
        {
            setPost({
                title: '',
                content: ''
            });
        }
    }, [context, title]);

    const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let form = new FormData(e.currentTarget);

        let data = {
            title: form.get('title')!.toString(),
            content: form.get('content')!.toString()
        }

        let reqParams = title ? {
            url: `${context.url}/posts/${title}`,
            method: 'PUT'
        } : {
            url: `${context.url}/posts`,
            method: 'POST'
        };

        fetch(reqParams.url, {
            method: reqParams.method,
            headers: {
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if(res.status === 401) context.dropToken();
            if(res.status >= 400) alert(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            else setRedirect(`../${data.title!.toString()}`)
        }).catch((e) => {
            alert(e.message);
        })
    }

    if(redirect) return <Navigate to={redirect}/>
    if(error) return <ErrorDisplay error={error}/>
    if(!post) return <>Loading...</>

    return(
        <div>
            <h2>📃 {title ? 'Edit' : 'New'} post</h2>
            <Link to='..'>&lt;&lt;&lt; Back</Link>
            <hr/>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <label htmlFor="title">Title:</label>
                <input name="title" id="title" pattern="[0-9a-zA-Z\-_]+" required defaultValue={post.title || ''}></input>
                <div>
                    <label htmlFor="content">Content:</label>
                </div>
                <div>
                    <textarea name="content" id="content" cols={52} rows={20} style={{resize:'none'}} defaultValue={post.content || ''}>
                    </textarea>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}