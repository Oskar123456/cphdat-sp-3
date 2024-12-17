import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

const StyledTypeName = styled.li`
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
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
    }
    & .off {
        text-decoration-line: line-through;
    }
`;

function TypeList({theme, types}){

    useEffect(() => {
    }, [theme, types])
    
    function makeTypeList()
    {
        if (!types || types.length < 1)
            return <ul></ul>
        let lis = types;
        if (types.length > 1)
            lis = types.sort((a, b) => (a && b) ? a.name > b.name : false);
        lis = lis.map(t => {
            return t ? ( <StyledTypeName key={crypto.randomUUID()}>
                <Link style={colorCodeType(theme, t)}  to={"/pokedex/type/" + t.name}>{capitalizeWord(t.name)}</Link>
                </StyledTypeName>) : <StyledTypeName key={crypto.randomUUID()}></StyledTypeName>;
        });
        return <ul>{lis}</ul>
    }
    
    return makeTypeList();
}

export default TypeList
