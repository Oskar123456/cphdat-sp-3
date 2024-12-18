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
    & a {
        color: black;
    }
    @media(max-width: 580px) {
        & a {
            font-size: 0.8rem;
        }
    }
    @media(max-width: 480px) {
        & a {
            font-size: 0.6rem;
        }
    }
`;

const StyledPath = styled.div`
    & a {
        color: black;
        margin-right: 0.4rem;
    }
`;

const StyledLogout = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    button {
        border-radius: 0.4rem;
        background-color: ${props => props.theme.poke_red};
        border: 0.2rem solid ${props => props.theme.poke_black};
        width: fit-content;
    }
`;

function ShowPath({currentUser, setCurrentUser}) {
    
    let acc = '';
    let location = useLocation();
    const [path, setPath] = useState("");

    useEffect(() => {
        acc = '';
        setPath(location.pathname);
        console.log(currentUser.username);
    }, [location, currentUser])

    return (
        <StyledDiv className="show_path">
        <StyledPath>
        { (path && path.length > 1) ? 
            path.split('/').map(sp => {
                if (sp.length > 0) {
                    acc += '/' + sp;
                    return (<Link key={crypto.randomUUID()} className="path_substr" 
                        to={acc}>{'/' + sp}</Link>)
                }
            }                
            ) : (
                <Link key={crypto.randomUUID()} className="path_substr" 
                to="/home">→home</Link>
            )
        }
        </StyledPath>
        { currentUser.loggedIn ?
            (<StyledLogout><p>
                {currentUser.username.substring(0, 10) + ((currentUser.username.length > 10) ? "..." : "")}
                </p>
             <Logout setCurrentUser={setCurrentUser}/></StyledLogout>) 
            :
            (<Link to='/login'>log in</Link>)
        }
        </StyledDiv>
    )

}

export default ShowPath


