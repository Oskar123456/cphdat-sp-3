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
        
        context.fillStyle = theme.poke_white;
        context.fillRect(0, 0, w, h)

        let w_graph = 0.63 * w;
        let h_bars = 0.12 * h;
        let padding = 0.03 * h;
        let font_size = 14;
        
        let attackVals = allPokemon.map(p => p.attack).sort((a,b) => a > b);
        let hpVals = allPokemon.map(p => p.hp).sort((a,b) => a > b);
        let defenseVals = allPokemon.map(p => p.defense).sort((a,b) => a > b);
        let spattackVals = allPokemon.map(p => p.special_attack).sort((a,b) => a > b);
        let spdefenseVals = allPokemon.map(p => p.special_defense).sort((a,b) => a > b);
        
        let statMax = Math.max(...[...attackVals, ...hpVals, ...defenseVals, ...spdefenseVals, ...spattackVals]);

        let hpLen = pokemon.hp / statMax * w_graph;
        let attackLen = pokemon.attack / statMax * w_graph;
        let defenseLen = pokemon.defense / statMax * w_graph;
        let spdefenseLen = pokemon.special_defense / statMax * w_graph;
        let spattackLen = pokemon.special_attack / statMax * w_graph;

        context.font = `${font_size}px VT323`;
        
        /* hp */
        context.fillStyle = theme.poke_red;
        context.fillRect(w - w_graph, 0 * h_bars, hpLen, h_bars);
        context.fillStyle = theme.poke_black;
        context.fillText("hp", 2, 3 * h_bars / 4);
        context.fillText(pokemon.hp.toString(), w - w_graph + hpLen + 2, 3 * h_bars / 4);
        /* attack */
        context.fillStyle = theme.poke_red;
        context.fillRect(w - w_graph, 1 * h_bars + 1 * padding, attackLen, h_bars);
        context.fillStyle = theme.poke_black;
        context.fillText(pokemon.attack.toString(), w - w_graph + attackLen + 2, 3 * h_bars / 4 + h_bars * 1 + 1 * padding);
        context.fillText("att", 2, 3 * h_bars / 4 + h_bars * 1 + 1 * padding);
        /* defense */
        context.fillStyle = theme.poke_red;
        context.fillRect(w - w_graph, 2 * h_bars + 2 * padding, spattackLen, h_bars);
        context.fillStyle = theme.poke_black;
        context.fillText(pokemon.special_attack.toString(), w - w_graph + spattackLen + 2, 3 * h_bars / 4 + h_bars * 2 + 2 * padding);
        context.fillText("sp.att", 2, 3 * h_bars / 4 + h_bars * 2 + 2 * padding);
        /*  */
        context.fillStyle = theme.poke_red;
        context.fillRect(w - w_graph, 3 * h_bars + 3 * padding, defenseLen, h_bars);
        context.fillStyle = theme.poke_black;
        context.fillText(pokemon.defense.toString(), w - w_graph + defenseLen + 2, 3 * h_bars / 4 + h_bars * 3 + 3 * padding);
        context.fillText("def", 2, 3 * h_bars / 4 + h_bars * 3 + 3 * padding);
        /* */
        context.fillStyle = theme.poke_red;
        context.fillRect(w - w_graph, 4 * h_bars + 4 * padding, spdefenseLen, h_bars);
        context.fillStyle = theme.poke_black;
        context.fillText(pokemon.special_defense.toString(), w - w_graph + spdefenseLen + 2, 3 * h_bars / 4 + h_bars * 4 + 4 * padding);
        context.fillText("sp.def", 2, 3 * h_bars / 4 + h_bars * 4 + 4 * padding);

        context.fillStyle = theme.poke_black;
        context.fillRect(w - w_graph, 5 * h_bars + 5 * padding, w_graph, 2);

        context.fillText("0", w - w_graph, 5 * h_bars + 5 * padding + font_size);
        context.fillText(statMax.toString(),
            w - statMax.toString().length * font_size / 2.5,
            5 * h_bars + 5 * padding + font_size);

    }, [pokemon, theme, allPokemon])

    return <canvas ref={canvasRef} height={h} width={w}/>

//                { label: "🖤",  y: pokemon.hp, color: theme.poke_red  },
//                { label: "💪", y: pokemon.attack, color: theme.poke_red  },
//                { label: "🐢", y: pokemon.defense, color: theme.poke_red  },
//                { label: "💪💪",  y: pokemon.special_attack, color: theme.poke_red  },
//                { label: "🐢🐢",  y: pokemon.special_defense, color: theme.poke_red  }
}

export default StatChart




