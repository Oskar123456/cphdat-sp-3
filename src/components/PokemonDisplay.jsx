import { useRef, useEffect, useState, useContext } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from "./PokemonImgDiv.jsx";
import TypeList from './TypeList.jsx'
import EvoChain from './EvoChain.jsx'
import StatChart from './StatChart.jsx'

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
        display: flex; 
        align-items: center;
        flex-wrap: wrap;

        a {
            margin-left: 0.1rem;
        }
    }
    
    @media(max-width: 580px) {
        h1 { 
            font-size: 0.8rem;
        }
        > * {
            font-size: 0.6rem;
        }
    }

    p {
    }

`;

function PokemonDisplay({currentUser, setCurrentUser, pokemon, habitats, types, theme}) 
{
    const loc = useLocation();
    const pokemonName = useParams();
    const [p, setP] = useState()
    const nav_back = useNavigate();

    useEffect(() => {
        for (let p of pokemon)  {
            if (p.name === pokemonName.name) {
                setP(p);
                console.log("set p to " + p.name);
                break;
            }
        }
    }, [pokemon, habitats, types, theme, pokemonName, loc])

    return (
        <StyledDiv >

        {p ? (
        <>
            <StyledLeft>
            
            <PokemonImgDiv pokemon={p} />
            
            <StatChart pokemon={p} theme={theme} allPokemon={pokemon} />
            
            </StyledLeft>
            
            <StyledRight>
            
            <StyledDescription>
            <h1>{capitalizeWord(p.name)} </h1> 
            <p>{p.flavor_text.replace("\x0C", " ")}</p> 
            <p>{"Its natural habitat is "} 
            <Link to={"/pokedex/habitat/" + p.habitat.name} style={colorCodeHabitat(theme, p.habitat)}>
            {capitalizeWord(p.habitat.name)}</Link></p> 
            
            <StyledTypeContainer>
            <h2>Types:</h2>
            <TypeList theme={theme} types={p.types} />           
            </StyledTypeContainer>
            
            <StyledTypeContainer>
            <h2>Evolution:</h2>
            <EvoChain theme={theme} pokemon={p} allPokemon={pokemon} />           
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



