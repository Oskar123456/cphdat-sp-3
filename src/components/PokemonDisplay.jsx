import { useRef, useEffect, useState, useContext } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Outlet, useLocation, useParams, useOutletContext } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from "./PokemonImgDiv.jsx";
import TypeList from './TypeList.jsx'
import StatChart from './StatChart.jsx'
import Testchart from '../js/testchart.jsx'

import { Chart } from 'chart.js'

const StyledDiv = styled.div`
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.black};
    background-color: ${props => props.theme.poke_white};
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    column-gap: 1rem;

`;
const StyledLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    column-gap: 1rem;

    > * {
        min-width: 100%;
    }

    img {
        border: 0.2rem solid ${props => props.theme.black};
    }
`;

const StyledStats = styled.div`
    display: flex;
    justify-content: flex-start;
        text-align: start;

    > * {
        display: flex;
        justify-content: flex-start;
        color: ${props => props.theme.poke_black};
        text-align: start;
    }
    
    p {
        text-align: start;
    }
`;

const StyledTypeContainer = styled.div`
    display: flex;

    > * {
        margin: 0 0;
        padding: 0 0;
    }

    h2 {
        font-size: 1rem;
    }
    
    ul {
        display: flex;
    }
    
    li {
        margin: 0 0;
    }
`

const StyledDescription = styled.div`
    a {
        border-radius: 0.5rem;
        padding: 0.2rem;
    }   
    
    > * {
        margin: 0.1rem 0;
        padding: 0 0;
    }

`;

function PokemonDisplay({currentUser, setCurrentUser, pokemon, habitats, types, theme}) {

    let pokemon_name = useParams();
    const [pokemonName, setPokemonName] = useState("");
    const [p, setP] = useState()
    
    function makeChart(thisP) {
        
        let attackVals = pokemon.map(p => p.attack).sort((a,b) => a > b);
        let hpVals = pokemon.map(p => p.hp).sort((a,b) => a > b);
        let defenseVals = pokemon.map(p => p.defense).sort((a,b) => a > b);
        
        let attackMin = 0;
        let hpMin = 0;
        let defenseMin = 0;
        
        let attackMax = Math.max(...attackVals);
        let hpMax = Math.max(...hpVals);
        let defenseMax = Math.max(...defenseVals);

        const data = {
            labels: ['hp', 'defense', 'attack'],
            datasets: [
                {
                    label: 'stats',
                    data: [thisP.hp, thisP.defense, thisP.attack]
                }
            ]
        };
        
       // new Chart("stats", {
       //     type: "bar",
       //     data: {
       //         labels: data.labels,
       //         datasets: [{
       //             data: data.datasets[0]
       //         }]
       //     },
       //     options: {
       //         legend: {display: false},
       //         title: {
       //             display: true,
       //             text: "World Wine Production 2018"
       //         }
       //     }
       // });
    }

    useEffect(() => {
        setPokemonName(pokemon_name.name);
        for (let p of pokemon)  {
            if (p.name === pokemon_name.name) {
                setP(p);
                makeChart(p);
                break;
            }
        }
    }, [pokemon, habitats, types, theme])

    //<StatChart pokemon={p} theme={theme} stats={[]} />
    return (
        <StyledDiv >

        {p ? (
        <>
            <StyledLeft>
            
            <PokemonImgDiv pokemon={p} />
            
            <Testchart />
            
            </StyledLeft>
            
            <StyledRight>
            
            <StyledDescription>
            <h1>{capitalizeWord(p.name)} </h1> 
            <p>{p.flavor_text} </p> 
            <p>{"Its natural habitat is "} 
            <Link to={"/pokedex/habitat/" + p.habitat.name} style={colorCodeHabitat(theme, p.habitat)}>
            {p.habitat.name}</Link></p> 
            <StyledTypeContainer>
            <h2>Types:</h2>
            <TypeList theme={theme} types={p.types} />           
            </StyledTypeContainer>
            </StyledDescription>

            </StyledRight>
        </>
        ) : <h1>Loading...</h1>
        }
        </StyledDiv>
    ) 
}

export default PokemonDisplay



