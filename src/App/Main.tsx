import React, { useContext } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Users } from "../Users/Users";
import { ApiContext } from "../ApiContext";
import { Login } from "../Login/Login";
import { Posts } from "../Posts/Posts";
import { Dashboard } from "../Dashboard/Dashboard";


export const Main = (props :{}) => {
    let context = useContext(ApiContext)!;

    if(!context.token)
        return <Login/>

    return(
        <BrowserRouter>
            <div style={{marginBottom: '1rem', display:'flex', columnGap:'1rem'}}>
                <Link to='/'>📊 Dashboard</Link>
                <Link to='/posts'>📃 Posts</Link>
                <Link to='/users'>👤 Users</Link>
                <div style={{margin:'auto'}}/>
                <span>[Logged in as <Link to={`/users/${context.user?.name}`}>{context.user?.name}</Link>]</span>
                <button className='action-button' onClick={context.dropToken}>⬅️ Log out</button>
            </div>
            <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/users/*' element={<Users/>}/>
                <Route path='/posts/*' element={<Posts/>}/>
            </Routes>        
        </BrowserRouter>
    )
}