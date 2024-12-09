import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled } from "styled-components";

import Logo from '../../public/images/pokeball.png'

import Logout from './Logout.jsx'

const StyledDiva = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & img {
        width: 7rem;
    }
`;

function Header({currentUser, setCurrentUser}) {

    return (
        <StyledDiva className="panel">
        <a href="/"> <img src={Logo}/> </a>
        <h1>Pokedex</h1> 

        { currentUser.loggedIn ?
            (<div><p>{currentUser.username} ({currentUser.roles})</p>
             <Logout setCurrentUser={setCurrentUser}/></div>) 
            :
            (<Link to='/login'>log in</Link>)
        }
        </StyledDiva>
    )

}

export default Header

