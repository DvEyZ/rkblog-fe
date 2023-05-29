import React from "react";
import { Link } from "react-router-dom";

export const UserBrief = (props :{
    name :string,
    permissions :string
}) => {
    return(
        <div>
            <Link to={props.name}>{props.name}</Link> - <span>{props.permissions}</span>
        </div>
    )
}