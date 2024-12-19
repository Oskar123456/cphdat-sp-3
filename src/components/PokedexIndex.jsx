import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import TypeList from './TypeList.jsx'

import { fetchWithJwt } from '../js/Accounts.js';
import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx';

import Login from './Login.jsx';

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

const StyledBottom = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.4rem;
    > * {
    }
    h1 {
        font-size: 2rem;
        margin: 0 0; 
        margin-bottom: 0.4rem; 
    }
    @media (max-width: 800px) {
        h1 {
            font-size: 1.2rem;
            margin: 0 0; 
            margin-bottom: 0.4rem; 
        }
    }
    @media (max-width: 600px) {
        h1 {
            font-size: 1.0rem;
        }
    }
`;

const StyledWelcomePage = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`

const StyledLink = styled.div`
    
`;

function PokedexIndex({currentUser, setCurrentUser, pokemon, habitats, types, theme}) {

    const pokemon_poster_url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fpokemon%2Fpokemon_PNG98.png&f=1&nofb=1&ipt=1e250c147aa898bf9d9e271d1a39b6805efe70a70e9448d13eeb17aad5bcbe6e&ipo=images";

    function buttonCrsClickCB(e) {
    }

    useEffect(() => {
    }, [pokemon, habitats, types, theme, currentUser])

    return (
        <StyledDiv >
            <h1>Welcome to the Pokedex</h1>
            <StyledBottom>
        { (!currentUser || !currentUser.loggedIn) ? (
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        ) : (
            <StyledWelcomePage>
            <h1>Welcome back {(currentUser.username.length < 1) ? "<unnamed user>" : currentUser.username }</h1>
            <Link to="/pokedex/mycollection">🞂 My collection</Link>
            </StyledWelcomePage>
        ) }
            <Link to='/pokedex/pokemon'>
                <h2>Discover</h2>
                <img src={pokemon_poster_url}/>
            </Link>
            </StyledBottom>
        </StyledDiv>
    ) 
}

export default PokedexIndex


