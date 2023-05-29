import React, { useContext } from "react";
import { ApiContext } from "../ApiContext";
import { Link } from "react-router-dom";

export const Dashboard = (props :{}) => {
    const context = useContext(ApiContext);

    return(
        <div>
            <h2>📊 Dashboard</h2>
            <hr/>
            <div>
                <div><Link to='posts'>📃 Posts</Link></div>
                <div><Link to='users'>👤 Users</Link></div>
            </div>
        </div>
    )
}