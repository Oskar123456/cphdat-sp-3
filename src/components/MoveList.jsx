import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

const StyledTypeName = styled.li`
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
    padding-top: 0.1rem;
    padding-right: 0.2rem;
    border: none;
    margin: 0.1rem 0;
    background-color: transparent;
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;

    p {
        display: flex; 
        flex-wrap: wrap;
        overflow-wrap: break-word;
    }
    
    > * {
        border-radius: 0.5rem;
        border: none;
        margin: 0.1rem 0;
        background-color: transparent;
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
    }
    h3 {
        font-size: 1rem;
        color: ${props => props.theme.poke_red};
    }
    & .off {
        text-decoration-line: line-through;
    }
`;

function MoveList({theme, moves}){

    useEffect(() => {
    }, [theme, moves])
    
    function makeMoveList()
    {
        if (!moves || moves.length < 1)
            return <ul></ul>
        let list = moves.sort((a, b) => (a && b) ? a.name > b.name : false);
        list = list.filter(m => m).map(m => { 
            return (
                <StyledTypeName key={crypto.randomUUID()}>
                    <h3>{capitalizeWord(m.name)}</h3>
                    <p>{"(power: " + m.power + ", target: " + m.target + ")"}</p>
                    <p>{m.flavor_text && m.flavor_text.replace("\x0C", " ")}</p>
                    <p>{m.effect_text && m.effect_text.replace("\x0C", " ")}</p>
                </StyledTypeName>
            )});
        return <ul>{list}</ul>
    }
    
    return makeMoveList();
}

export default MoveList
