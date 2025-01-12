import React, { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

import Logout from './Logout.jsx'

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.poke_gray};
    border: 0.2rem solid ${props => props.theme.poke_black};
    border-radius: 1rem;
    padding: 0.5rem;
    max-height: 2rem;
    a {
        color: black;
    }
    @media(max-width: 580px) {
        a {
            font-size: 0.8rem;
        }
    }
    @media(max-width: 480px) {
        a {
            font-size: 0.6rem;
        }
    }
`;

const StyledPath = styled.div`
    & a {
        color: black;
        margin-right: 0.1rem;
    }
`;

const StyledLogout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        color: black;
        background: none!important;
        border: none;
        padding: 0!important;
        /*optional*/
        /*input has OS specific font-family*/
        text-decoration: underline;
        cursor: pointer;
    }
`;

function ShowPath({currentUser, setCurrentUser, setCurrentUserPokemon}) {
    
    let acc = '';
    let location = useLocation();
    const [path, setPath] = useState("");
    const [uName, setUName] = useState('');

    useEffect(() => {
        acc = '';
        setPath(location.pathname);
        try {
            setUName(JSON.parse(localStorage.getItem("user")).username)
        }
        catch (e) {
        }
    }, [location, currentUser])

    return (
        <StyledDiv className="show_path">
        <StyledPath>
        { (path && path.length > 1) ? 
            path.split('/').map(sp => {
                if (sp.length > 0) {
                    acc += '/' + sp;
                    return (<Link key={crypto.randomUUID()} className="path_substr" 
                        to={acc}>{'>' + sp}</Link>)
                }
            }                
            ) : (
                <Link key={crypto.randomUUID()} className="path_substr" 
                to="/home">&gt;home</Link>
            )
        }
        </StyledPath>
        { currentUser.loggedIn ?
            (<StyledLogout>
                <p>{uName.substring(0, 10) + ((uName.length > 10) ? "..." : "")} </p>
                <Logout setCurrentUser={setCurrentUser} setCurrentUserPokemon={setCurrentUserPokemon}/>
                </StyledLogout>) 
            :
            (<Link to='/login'>log in</Link>)
        }
        </StyledDiv>
    )

}

export default ShowPath


