import React, { useEffect, useState, useActionState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/App.css'

import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import ApiDocs from './components/ApiDocs.jsx'

function App() 
{
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })
    
    return ( <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}/>)
}

export default App
