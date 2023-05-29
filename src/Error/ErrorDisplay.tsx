import React from "react"

import './ErrorDisplay.css'

export const ErrorDisplay = (props :{error :Error}) => {
    return(
        <div className="error">
            <h2>Error</h2>
            <div>{props.error.message}</div>
        </div>
    )
}