//import { useRef, useEffect, useState, useContext } from "react";
//import { styled, ThemeProvider } from "styled-components";
//import { Outlet, useLocation, useParams, useOutletContext } from "react-router-dom";
//import { NavLink, Link } from "react-router-dom";
//
//import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
//import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
//import { habitatImageLink } from "../js/PokeUtils.js";
//import PokemonImgDiv from "./PokemonImgDiv.jsx";
//import TypeList from './TypeList.jsx'
//
//
//import CanvasJSReact from '@canvasjs/react-charts';
//
//const CanvasJS = CanvasJSReact.CanvasJS;
//const CanvasJSChart = CanvasJSReact.CanvasJSChart;
//
//function StatChart({pokemon, stats, theme}) {
//
//    const canvasRef = useRef(null);
//
//
//    const [w, h] = [135, 150];
//
//    const options = {
//        axisX:{
//            gridThickness: 0,
//            tickLength: 0,
//            lineColor: theme.poke_white,
//            labelFontColor: theme.poke_white
//        },
//        axisY:{
//            gridThickness: 0,
//            tickLength: 0,
//            lineColor: theme.poke_white,
//            labelFontColor: theme.poke_white
//        },
//
//        title:{
//            text:"stats",
//            fontSize: 16,
//            fontFamily: "VT323",
//            fontWeight: 'bold'
//        },
//        backgroundColor: theme.poke_white,
//        dataPointMaxWidth: 20,
//        height: h,
//        width: w,
//        data: [{				
//            indexAxis: 'y', // <-- here
//            responsive: true,
//            type: "bar",
//            dataPoints: [
//                { label: "🖤",  y: pokemon.hp, color: theme.poke_red  },
//                { label: "💪", y: pokemon.attack, color: theme.poke_red  },
//                { label: "🐢", y: pokemon.defense, color: theme.poke_red  },
//                { label: "💪💪",  y: pokemon.special_attack, color: theme.poke_red  },
//                { label: "🐢🐢",  y: pokemon.special_defense, color: theme.poke_red  }
//            ]
//        }]
//    };
//
//    return <CanvasJSChart options = {options} />;
//}
//
//export default StatChart
//
//
//
//
