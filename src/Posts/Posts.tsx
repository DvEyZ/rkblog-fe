import React from "react";
import { Route, Routes } from "react-router-dom";
import { PostIndex } from "./PostIndex/PostIndex";
import { PostDetail } from "./PostDetail/PostDetail";
import { PostEditor } from "./PostEditor/PostEditor";

export const Posts = (props :{}) => {
    return(
        <Routes>
            <Route path="/" element={<PostIndex/>}/>
            <Route path="/@new" element={<PostEditor/>}/>
            <Route path="/:title" element={<PostDetail/>}/>
            <Route path="/:title/edit" element={<PostEditor/>} />
        </Routes>
    )
}