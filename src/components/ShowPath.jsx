import React, { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background: ${props => props.theme.poke_gray};
    border: 0.2rem solid ${props => props.theme.poke_black};
    border-radius: 1rem;
    padding: 0.5rem;
    & a {
        color: black;
    }
`;

function ShowPath({currentUser, setCurrentUser}) {
    
    let acc = '';
    let location = useLocation();
    const [path, setPath] = useState("");

    useEffect(() => {
        acc = '';
        setPath(location.pathname);
    }, [location])

    return (
        <StyledDiv className="show_path">
        { (path && path.length > 1) ? 
            path.split('/').map(sp => {
                if (sp.length > 0) {
                    acc += '/' + sp;
                    return (<Link key={crypto.randomUUID()} className="path_substr" 
                        to={acc}>{'→' + sp}</Link>)
                }
            }                
            ) : (
                <Link key={crypto.randomUUID()} className="path_substr" 
                to="/home">→home</Link>
            )
        }
        { currentUser.loggedIn ?
            (<div><p>{currentUser.username} ({currentUser.roles})</p>
             <Logout setCurrentUser={setCurrentUser}/></div>) 
            :
            (<Link to='/login'>log in</Link>)
        }
        </StyledDiv>
    )

}

export default ShowPath


