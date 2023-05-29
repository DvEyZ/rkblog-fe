import React from "react";
import { Link } from "react-router-dom";

export const PostBrief = (props :{
    title :string,
    author :string,
    owned :boolean
}) => {
    return(
        <div>
            <Link to={`/posts/${props.title}`}>{props.title}</Link> by <Link to={`/users/${props.author}`}>{props.author}</Link>
            {
                props.owned &&
                <span> (<Link to={`/posts/${props.title}/edit`}>edit</Link>)</span>
            }
        </div>
    )
}