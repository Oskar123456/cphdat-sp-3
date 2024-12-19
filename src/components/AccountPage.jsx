import React, { useState, useEffect, createRef } from "react"
import { Outlet, useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

import PokemonCard from './PokemonCard.jsx';
import { fetchWithJwt } from '../js/Accounts.js';

const StyledDiv = styled.div`
    font-family: "VT323", serif;
    font-weight: 400;
    font-style: normal;
    
    display: flex;
    flex-direction: column;

    background-color: ${props => props.theme.poke_white};
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    
    padding: 0.5rem;

    > * {
        margin: 0.4rem 0;
    }

    > h1 {
        font-weight: 600;
    }

`;

const StyledButton = styled.button`
    display: flex;
    width: fit-content;
    
    font: inherit;
    
    border-radius: 0.4rem;
    background-color: ${props => props.theme.white};
    border: 0.2rem solid ${props => props.theme.poke_black};
    color: ${props => props.theme.poke_black};
    width: fit-content;
    
    margin-right: 0.4rem;
    &:hover {
        border: 0.2rem solid ${props => props.theme.poke_red};
    }

    &:active {
        background-color: ${props => props.theme.poke_red};
    }
`;

const StyledStats = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
`

const StyledCardPack = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    gap: 0.4rem;

    @media (max-width: 1040px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (max-width: 840px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 540px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 400px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const StyledLink = styled.div`
    a {
        display: flex;
        width: fit-content;
        
        font: inherit;
        
        border-radius: 0.4rem;
        background-color: ${props => props.theme.white};
        border: 0.2rem solid ${props => props.theme.poke_black};
        color: ${props => props.theme.poke_black};
        width: fit-content;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        &:hover {
            border: 0.2rem solid ${props => props.theme.poke_red};
        }

        &:active {
            background-color: ${props => props.theme.poke_red};
        }
    }
`

function AccountPage({currentUser, currentUserPokemon, setCurrentUserPokemon, pokemon, theme}) 
{

    const [cardPack, setCardPack] = useState([]);
    
    useEffect(() => {
        chartByType(200, 100);
    }, [currentUser, currentUserPokemon])

    function addPack(p) {
        setCurrentUserPokemon(currentUserPokemon.concat(p));
        setCardPack(p);
    }
    
    function getPack() {
        fetchWithJwt("/pokemon/getpack", addPack, (r) => console.log(r), "POST");
    }

    function renderPack() {
        console.log(cardPack);
        return (
            <StyledCardPack>
            {cardPack.map(p => {
                return (
                    <PokemonCard theme={theme} p={p} /> 
                )})}
            </StyledCardPack>
        ) 
    }

    function generalStats() {
        let p_freqs = new Array(pokemon.length + 1).fill(0);
        for (let p of currentUserPokemon)
            p_freqs[p.id]++;
        let p_uniq = p_freqs.reduce((acc, f) => acc += (f > 0) ? 1 : 0, 0);
        let p_total = pokemon.length;
        let p_owned = currentUserPokemon.length;
        let p_owned_prop = (p_uniq / pokemon.length) * 100;
        let title = <p>You have collected {p_uniq} (unique) out of {p_total} ({p_owned_prop.toString().substr(0,4)}%) POKèMON</p>;

        return title;
    }

    function chartByType(w, h) {
        let d = document.getElementById("chart_by_type");
        if (!d) return;
        
        const canvas = document.createElement("canvas");
        
        let dpr = Math.ceil(window.devicePixelRatio) || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
        
        const context = canvas.getContext('2d')

        context.fillStyle = theme.poke_black;
        context.fillRect(0, 0, w, h)

        while (d.lastChild) {
            d.removeChild(d.lastChild);
        }
        d.appendChild(canvas);
    }
    
    return (
        <StyledDiv>
        { (currentUser && currentUser.loggedIn) ?
            (
                <>
                <h1>My collection</h1>
                <StyledLink>
                <Link to="/pokedex/pokemon">Go to Pokedex</Link>
                </StyledLink>
                <StyledButton onClick={getPack}>Get card pack</StyledButton>
                {cardPack.length > 0 && (
                    renderPack()
                )}
                <h2>Statistics</h2>
                {generalStats()}
                <StyledStats>
                <div id="chart_by_type" />
                </StyledStats>
                </>
            ) : (
                <h1>Not logged in</h1>
            )
        }
        </StyledDiv>
    )

}

export default AccountPage



