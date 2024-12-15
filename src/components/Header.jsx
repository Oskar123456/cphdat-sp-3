import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled } from "styled-components";

import Logo from '../images/pokeball.png'

import Logout from './Logout.jsx'

const StyledUl = styled.ul`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    gap: 1rem;
    & li a {
        color: black;
    }
`;

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
        <div className='sidebar'>
        <StyledUl className='menu'>
        <li> <Link to='/home'>Home</Link> </li>
        <li> <Link to='/pokedex'>Pokedex</Link> </li>
        <li> <Link to='/apidocs'>ApiDocs</Link> </li>
        </StyledUl>
        </div>

        </StyledDiva>
    )

}

export default Header

