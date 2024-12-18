import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

const StyledLink = styled.li`
    border-radius: 0.4rem;
    padding: 0.1rem;
    padding-top: 0.1rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    border: none;
    margin: 0.1rem 0;
    background-color: transparent;
    text-decoration: underline;
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    
    list-style-type: none;
    
    &:hover {
        cursor: pointer;
    }
    > * {
        border-radius: 0.5rem;
        border: none;
        margin: 0.1rem 0;
        background-color: transparent;
        text-decoration: underline;
        color: ${props => props.theme.poke_black};
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
    }
    & .off {
        text-decoration-line: line-through;
    }

    .matched {
        color: ${props => props.theme.poke_red};
    }
`;

function EvoChain({pokemon, allPokemon, theme}){

    useEffect(() => {
    }, [theme, pokemon, allPokemon])

    function findByName(name) {
        for (let p of allPokemon)
            if (p.name == name) 
                return p;
        return null;
    }
    
    function makeEvoChain()
    {
        let evo_chain = [pokemon];
        
        let p_current = pokemon;
        while ((p_current = findByName(p_current.evolve_from)))
            evo_chain.unshift(p_current);
        p_current = pokemon;
        while ((p_current = findByName(p_current.evolve_to)))
            evo_chain.push(p_current);

        //console.log(evo_chain);

        let lis = evo_chain.map(p => {
            //console.log(p.name);
            //console.log(pokemon.name);
            return ( <StyledLink key={crypto.randomUUID()}>
                <Link className={p.name === pokemon.name ? "matched" : ""} to={"/pokedex/pokemon/" + p.name}>{capitalizeWord(p.name)}</Link>
                </StyledLink>)
        });
        return <ul>{lis}</ul>
    }
    
    return makeEvoChain();
}

export default EvoChain

