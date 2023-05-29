import React, { useContext } from "react";
import { ApiContext } from "../ApiContext";

export const Dashboard = (props :{}) => {
    const context = useContext(ApiContext);

    return(
        <div>
            <h2>📊 Dashboard</h2>
            <hr/>
            <div>
                <h3>Welcome!</h3>
            </div>
        </div>
    )
}