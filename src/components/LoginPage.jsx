import { useEffect, useState, useActionState } from "react";
import { Outlet } from "react-router-dom";
import { login, logout, signup, getUser } from '../js/ApiFacade.js'
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import Login from './Login.jsx';

const StyledOuter = styled.div`
`;

const StyledDiv = styled.div`
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    background-color: ${props => props.theme.poke_white};
    @media (max-width: 768px) {
        width: 100%;
    }
    
    > * {
        padding: 0.4rem;
    }
    
    a {
        color: ${props => props.theme.poke_black};
        font-size: 1.2rem;
        padding-left: 0.4rem;
        > h2 {
            font-size: 2rem;
            margin: 0 0; 
        }
        @media (max-width: 800px) {
            h2 {
                font-size: 1.5rem;
            }
        }
        border-radius: 0.5rem;
        &:hover {
            background-color: ${props => props.theme.poke_gray};
        }
        img {
            width: 90%;
            border-radius: 1rem;
        }
        &:active {
            background-color: ${props => props.theme.poke_red};
        }
    }
`;

function LoginPage({currentUser, setCurrentUser}){
    return(
        <StyledOuter>
        <StyledDiv>
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </StyledDiv>
        </StyledOuter>
        )
}

export default LoginPage



