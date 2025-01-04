import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

/* source: https://alvarotrigo.com/blog/toggle-switch-css/ */
const Styled = styled.label`
    position: relative;
    display: inline-block;
    width: 30px;
    height: 20px;

    input {
        opacity: 0;
        height: 0;
        width: 0;
    }

    .slider {
        border-radius: 2rem;
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .slider:before {
        border-radius: 2rem;
        border: 2px solid ${props => props.theme.poke_black};
        background-color: ${props => props.theme.gray};
        
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 2px;
        bottom: 2px;
        -webkit-transition: .3s;
        transition: .3s;
    }

    input:checked + .slider {
      background-color: ${props => props.theme.azure};
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(11px);
      -ms-transform: translateX(11px);
      transform: translateX(11px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 17px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
`;

function ToggleButton({callBack})
{
    useEffect(() => {
    }, []);
    
    return (
      <Styled>
          <input type="checkbox" onClick={callBack}/>
          <span className="slider"></span>
      </Styled>
    )
}

export default ToggleButton

