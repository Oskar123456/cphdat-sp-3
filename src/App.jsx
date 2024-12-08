import React, { useEffect, useState, useActionState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import './styles/App.css'

import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import UserTest from './components/UserTest.jsx'
import AdminTest from './components/AdminTest.jsx'
import Trips from './components/Trips.jsx'
import Trip from './components/Trip.jsx'
import Guides from './components/Guides.jsx'
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
            <Route path="/admintest" element={<AdminTest currentUser={currentUser}  />} />
            <Route path="/usertest" element={<UserTest currentUser={currentUser}  />} />
            <Route path="/apidocs" element={<ApiDocs currentUser={currentUser}  />} />
            <Route path="/trips" element={<Trips currentUser={currentUser}  />} />
            <Route path="/trips/*" element={<Trip currentUser={currentUser}  />} />
            <Route path="/guides" element={<Guides currentUser={currentUser}  />} />
        </Route>
    </Routes>
    )
}

export default App
