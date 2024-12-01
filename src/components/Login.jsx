import { useEffect, useState, useActionState } from "react";
import { Outlet } from "react-router";
import { login, logout, getUser } from '../js/Accounts.js'
import HttpRequest from '../js/HttpRequest.js'

function Login({currentUser, setCurrentUser}) 
{

    const [message, setMessage] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userList, setUserList] = useState([])

    function submitAction(event) {
        event.preventDefault();
        login(userName, userPassword, setCurrentUser);
        
    }

    useEffect(() => {
    }, [])

    return (
        <div className="login_container">
        <h1>Log ind</h1>
        { !currentUser.loggedIn ? (
            <form className="login_form" id="signup-form">
            <label htmlFor="email" >Email: </label>
            <input name="email" id="email" placeholder="react@example.com" onChange={(email) => setUserName(email.target.value)}/>
            <label htmlFor="password">password: </label>
            <input name="password" id="password" placeholder="something complicated" onChange={(pw) => setUserPassword(pw.target.value)}/>
            <button onClick={submitAction}>Sign up</button>
            {!!message && <p>{message}</p>}
            </form> 
        ) : (
            <h2>Welcome back { currentUser.username }</h2>
        )
        }
        </div>
    )

}

export default Login


