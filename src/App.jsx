import React, { useEffect, useState, useActionState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import './styles/App.css'

import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import ApiDocs from './components/ApiDocs.jsx'

function App() 
{
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })
    
    return (
    <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser}/>}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/apidocs" element={<ApiDocs currentUser={currentUser}  />} />
            <Route path="/pokedex" element={<p>WIP</p>} />
        </Route>
    </Routes>
    )
}

export default App
