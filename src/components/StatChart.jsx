"use client";
import { useRef, useEffect, useState, useContext } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Outlet, useLocation, useParams, useOutletContext } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
//import {require} from 'requirejs'

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from "./PokemonImgDiv.jsx";
import TypeList from './TypeList.jsx'

function StatChart({pokemon, theme, allPokemon}) {

    const canvasRef = useRef(null);


    const [w, h] = [100, 150];

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#000000'
        context.fillRect(0, 0, w, h)
        
        let attackVals = allPokemon.map(p => p.attack).sort((a,b) => a > b);
        let hpVals = allPokemon.map(p => p.hp).sort((a,b) => a > b);
        let defenseVals = allPokemon.map(p => p.defense).sort((a,b) => a > b);
        
        let attackMin = 0;
        let hpMin = 0;
        let defenseMin = 0;
        
        let attackMax = Math.max(...attackVals);
        let hpMax = Math.max(...hpVals);
        let defenseMax = Math.max(...defenseVals);
    }, [])

    return <canvas ref={canvasRef} height={h} width={w}/>

//                { label: "🖤",  y: pokemon.hp, color: theme.poke_red  },
//                { label: "💪", y: pokemon.attack, color: theme.poke_red  },
//                { label: "🐢", y: pokemon.defense, color: theme.poke_red  },
//                { label: "💪💪",  y: pokemon.special_attack, color: theme.poke_red  },
//                { label: "🐢🐢",  y: pokemon.special_defense, color: theme.poke_red  }
}

export default StatChart




