import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled } from "styled-components";

import Logo from '../images/pokeball.png'

import Logout from './Logout.jsx'

const StyledUl = styled.ul`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    gap: 0.3rem;
    & li a {
        color: ${props => props.theme.poke_black};
        background-color: ${props => props.theme.poke_gray};
        border: 0.2rem solid ${props => props.theme.poke_black};
        border-radius: 0.4rem;
        padding: 0.4rem;
    }
    @media(max-width: 580px) {
        & li a {
            font-size: 0.8rem;
            border: 0.15rem solid ${props => props.theme.poke_black};
        }
    }
    
    @media(max-width: 480px) {
        & li a {
            font-size: 0.6rem;
            border: 0.12rem solid ${props => props.theme.poke_black};
        }
    }
    @media(max-width: 420px) {
        & li a {
            font-size: 0.4rem;
            border: 0.10rem solid ${props => props.theme.poke_black};
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
        border: 0.2rem solid ${props => props.theme.poke_black};
        border-radius: 0.8rem;
        padding: 0.8rem;
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
        & img {
            width: 5rem;
        }
    }
    
    @media(max-width: 420px) {
        h1 {
            font-size: 0.8rem;
        }
        & img {
            width: 4rem;
        }
    }
`;

function Header({currentUser, setCurrentUser}) {

    return (
        <StyledDiva className="panel">
        <a href="/"> <img src={Logo}/> </a>
        <h1>Pokedex</h1> 
        <StyledUl>
        <li> <Link to='/home'>About</Link> </li>
        <li> <Link to='/pokedex'>Pokedex</Link> </li>
        <li> <Link to='/apidocs'>ApiDocs</Link> </li>
        </StyledUl>
        </StyledDiva>
    )

}

export default Header

