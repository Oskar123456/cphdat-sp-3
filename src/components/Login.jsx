import { useEffect, useState, useActionState } from "react";
import { Outlet } from "react-router-dom";
import { login, logout, signup, getUser } from '../js/Accounts.js'
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import HttpRequest from '../js/HttpRequest.js'

const StyledDiv = styled.div`
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        > * {
            margin-bottom: 0.4rem;
        }
        button {
            font-family: "VT323", serif;
            font-weight: 600;
            font-style: normal;
            border-radius: 0.4rem;
            background-color: ${props => props.theme.white};
            border: 0.2rem solid ${props => props.theme.poke_black};
            width: fit-content;
        }
    }
`;

const StyledTextInput = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.theme.white};
    display: flex;
    gap: 0.5rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    align-items: center;
    height: 2rem;
    border-radius: 0.5rem;
    border: 0.2rem solid ${props => props.theme.poke_gray};
    width: 94%;
    
    &:hover {
        border: 0.2rem solid ${props => props.theme.poke_red};
    }

    & img {
        height: 1.2rem;
    }
    
    & input {
        background-color: ${props => props.theme.white};
        height: 90%;
        border: none;
        caret-color: ${props => props.theme.poke_black};
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
        width: 100%;
    }
    
    & input:focus {
        border: none;
        outline: none;
    }
`;

const StyledButtons = styled.div`
    display: flex;
    > * {
        margin-right: 0.4rem;
        &:hover {
            border: 0.2rem solid ${props => props.theme.poke_red};
        }
    }
    button {
        &:active {
            background-color: ${props => props.theme.poke_red};
        }
    }
`;

function Login({currentUser, setCurrentUser}) 
{

    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState();

    function errorCallback(message) {
        setError(message);
    }

    function loginCB(event) {
        event.preventDefault();
        login(userName, userPassword, setCurrentUser, errorCallback);
    }

    function signupCB(event) {
        event.preventDefault();
        signup(userName, userPassword, setCurrentUser, errorCallback);
    }

    useEffect(() => {
    }, [currentUser])

    return (
        <StyledDiv>
        <h1>Log in</h1>
        { (!currentUser || !currentUser.loggedIn) ? (
            <form className="login_form" id="signup-form">
            <StyledTextInput>
            <label htmlFor="email" >Email: </label>
            <input name="email" id="email" placeholder="ash@pokedex.com" onChange={(email) => setUserName(email.target.value)}/>
            </StyledTextInput>
            <StyledTextInput>
            <label htmlFor="password">password: </label>
            <input name="password" id="password" placeholder="something nobody can remember" onChange={(pw) => setUserPassword(pw.target.value)}/>
            </StyledTextInput>
            <StyledButtons>
            <button onClick={loginCB}>Log in</button>
            <button onClick={signupCB}>Sign up</button>
            </StyledButtons>
            {error && <p>{error.toString()}</p>}
            </form> 
        ) : (currentUser && currentUser.loggedIn) ? (
            <h2>Welcome back {(currentUser.username.length < 1) ? "<unnamed user>" : currentUser.username.length }</h2>
        ) : (
            <h2>??</h2>
        )
        }
        </StyledDiv>
    )

}

export default Login


