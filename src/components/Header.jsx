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
        color: ${props => props.theme.poke_red};
        background-color: ${props => props.theme.poke_white};
        box-shadow: 0px 0px 1rem 1rem ${props => props.theme.poke_white};
    }
    @media(max-width: 580px) {
        & li a {
            font-size: 0.8rem;
        }
    }
    
    @media(max-width: 480px) {
        & li a {
            font-size: 0.6rem;
        }
    }
    @media(max-width: 420px) {
        & li a {
            font-size: 0.4rem;
        }
    }
`;

const StyledDiva = styled.div`
    margin-top: 0.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & img {
        width: 7rem;
    }

    h1 {
        background-color: ${props => props.theme.poke_white};
        box-shadow: 0px 0px 2rem 2rem ${props => props.theme.poke_white};
    }

    @media(max-width: 580px) {
        h1 {
            font-size: 1.5rem;
        }
    }
    
    @media(max-width: 480px) {
        h1 {
            font-size: 1.2rem;
        }
    }
    
    @media(max-width: 420px) {
        h1 {
            font-size: 0.8rem;
        }
    }
`;

function Header({currentUser, setCurrentUser}) {

    return (
        <StyledDiva className="panel">
        <a href="/"> <img src={Logo}/> </a>
        <h1>Pokedex</h1> 
        <div className='sidebar'>
        <StyledUl>
        <li> <Link to='/home'>About</Link> </li>
        <li> <Link to='/pokedex'>Pokedex</Link> </li>
        <li> <Link to='/apidocs'>ApiDocs</Link> </li>
        </StyledUl>
        </div>

        </StyledDiva>
    )

}

export default Header

