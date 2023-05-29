import React, { useContext, useEffect, useState } from "react";
import { ErrorDisplay } from "../../Error/ErrorDisplay";
import { ApiContext } from "../../ApiContext";
import { IPostBriefModel } from "../IPostModel";
import { PostBrief } from "./PostBrief";
import { Link } from "react-router-dom";

export const PostIndex = (props :{}) => {
    const context = useContext(ApiContext)!;

    const [posts, setPosts] = useState<IPostBriefModel[]>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        fetch(`${context.url}/posts`, {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        }).then(async (res) => {
            if(res.status >= 400) throw new Error(`Server responded with status ${res.status}: ${(await res.json()).message}`);
            return res.json();
        }).then((v) => {
            setPosts(v);
        }).catch((e) => {
            setError(e);
        })
    }, [context.url, context.token])

    if(error) return <ErrorDisplay error={error}/>
    if(!posts) return <>Loading...</>

    return(
        <div>
            <h2>📃 Posts</h2>
            <hr/>
            <div>(<Link to='@new'>new</Link>)</div>
            {
                posts.sort((a,b) => {
                    let ac = a.author.localeCompare(b.author);
                    if(ac !== 0) return ac;
                    else return a.title.localeCompare(b.title);
                }).map((v,i) => <PostBrief key={i} title={v.title} author={v.author} owned={
                    (v.author === context.user?.name) || (context.user?.permissions === 'Admin')
                }/>)
            }
        </div>
    )
}