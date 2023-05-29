import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserIndex } from "./UserIndex/UserIndex";
import { UserDetail } from "./UserDetail/UserDetail";
import { UserEditor } from "./UserEditor/UserEditor";

export const Users = (props :{}) => {
    return(
        <Routes>
            <Route path='/' element={<UserIndex/>}/>
            <Route path='/@new' element={<UserEditor/>}/>
            <Route path='/:name' element={<UserDetail/>}/>
            <Route path='/:name/edit' element={<UserEditor/>}/>
        </Routes>
    )
}