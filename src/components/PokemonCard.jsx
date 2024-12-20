import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import TypeList from './TypeList.jsx'

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

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
    background-color: ${props => props.theme.poke_white};
    ul {
        padding: 0 0;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledPokemonCard = styled.div`
    /*border: 0.1rem solid ${props => props.theme.poke_black};*/
    border-radius: 0.5rem;
    padding: 0.3rem;
    background-color: ${props => props.theme.poke_gray};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;

    > * {
        margin: 0 0;
        gap: 0;
        width: 100%;
        height: 100%;
        
        img {
            width: 100%;
            height: 100%;
        }
    }

    ul {
        padding-top: 0.2rem;
        display: flex;
    }

    li {
        padding-right: 0.2rem;
    }

    li > * { 
        padding: 0.2rem;
    }

    img {
        margin-left: 0;
    }

    &:hover {
        background-color: ${props => props.theme.poke_red};
        cursor: pointer;
    }
    
    & .pokemon-card-title {
        font-size: 1.0rem;
        color: ${props => props.theme.black};
    }

    & p {
        text-align: left;
        font-size: 0.9rem;
        color: ${props => props.theme.poke_black};
    }

    & .pokemon-card-type-container {
        display: flex;
        gap: 0.1rem;
        width: 100%;
        justify-content: flex-begin;
    }
    
    & .pokemon-card-type-container > * {
        width: fit-content;
        border-radius: 0.4rem;
        padding: 0.1rem;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        color: ${props => props.theme.poke_black};
    }

`;

function PokemonCard({p, owned, habitats, types, theme}) {

    function makePokeCard(p_list, type_filter)
    {
        return (
            <Link key={crypto.randomUUID()} to={'/pokedex/pokemon/' + p.name}>
            <StyledPokemonCard className={owned ? "owned" : "unowned"} key={crypto.randomUUID()} > 
            <PokemonImgDiv pokemon={p} />
            <p>{"#" + ("000" + p.id).slice(-3)}</p>
            <p className="pokemon-card-title">{owned ? capitalizeWord(p.name) : "???"}</p>
            {owned ? <TypeList theme={theme} types={p.types} /> : <p>"???"</p>}
            </StyledPokemonCard>
            </Link>
        );
    }

    useEffect(() => {
    }, [theme])


    return (
        <StyledDiv>
            { makePokeCard() }
        </StyledDiv>
    ) 
}

export default PokemonCard




