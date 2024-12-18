import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

/* source: https://alvarotrigo.com/blog/toggle-switch-css/ */
const Styled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    input[type=checkbox]{
      height: 0;
      width: 0;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 1.6rem;
      height: 1.1rem;
      background: grey;
      display: block;
      border-radius: 1rem;
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: 0.15rem;
      left: 0.15rem;
      width: 0.75rem;
      height: 0.75rem;
      background: white;
      border-radius: 2rem;
      transition: 0.4s;
    }

    input:checked + label {
      background: ${props => props.theme.azure};
    }

    input:checked + label:after {
      left: calc(100% - 0.15rem);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 0.70rem;
    }
`;

function ToggleButton({callBack})
{
    useEffect(() => {
    }, []);
    
    return <Styled><input type="checkbox" id="switch" onClick={callBack} /><label htmlFor="switch">Toggle</label></Styled>;
}

export default ToggleButton

