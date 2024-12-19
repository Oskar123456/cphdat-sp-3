import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import Themes from '../js/Themes.js';
import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";

const Styled = styled.div`
`

function PokemonImgDiv({pokemon})
{
    useEffect(() => {
    }, [pokemon])
    
    return (
        <Styled style={{
            backgroundImage: `url(${habitatImageLink(pokemon.habitat)})`,
            backgroundSize: "cover", borderRadius: "0.4rem"}}>
        <img src={pokemon.sprites.front_default} />
        </Styled>
    )
}

export default PokemonImgDiv
