import { useRef, useEffect, useState, useContext } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from "./PokemonImgDiv.jsx";
import TypeList from './TypeList.jsx'
import AbilityList from './AbilityList.jsx'
import MoveList from './MoveList.jsx'
import EvoChain from './EvoChain.jsx'
import StatChart from './StatChart.jsx'

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    display: flex;
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
    row-gap: 1rem;

    > * {
        min-width: 100%;
    }

    div {
        border: 0.2rem solid ${props => props.theme.black};
    }

    img {
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
        text-decoration: underline;
    }

    ul {
        display: flex;
    }
    
    li {
        margin: 0 0;
    }
    
`

const StyledDescription = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
    a {
        border-radius: 0.5rem;
        padding: 0.2rem;
    }   
    
    > * {
        margin: 0.1rem 0;
        padding: 0 0;
        display: flex; 
        flex-wrap: wrap;
        align-items: center;

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0.1rem;
        }
    }

    h1 {
        font-size: 1.8rem;
        color: ${props => props.theme.poke_red};
    }
    
    @media(max-width: 580px) {
        h1 { 
            font-size: 1.4rem;
        }
        > * {
            font-size: 0.6rem;
        }
        
    }
    
    @media(max-width: 580px) {
        h1 { 
            font-size: 1.4rem;
        }
        > * {
            font-size: 0.6rem;
        }
        
    }
    
    p {
        width: 55%;
        overflow-wrap: break-word;
    }

    @media(min-width: 480px) {
        p {
            width: 100%;
        }
    }
    
`;

const StyledMoveContainer = styled.div`
    > * {
        margin: 0 0;
        padding: 0 0;

    }

    h2 {
        font-size: 1.4rem;
        text-decoration: underline;
    }

    ul {
        display: flex;
        flex-direction: column;
    }
    
    li {
        margin: 0 0;
    }
`;

const StyledAbilityContainer = styled.div`
    > * {
        margin: 0 0;
        padding: 0 0;

    }

    h2 {
        font-size: 1.4rem;
        text-decoration: underline;
    }

    ul {
        display: flex;
        column-gap: 1.8rem;
    }
    
    li {
        margin: 0 0;
    }
    
    @media(max-width: 500px) {
        ul {
            display: flex;
            flex-direction: column;
        }
    }
`;

const StyledEvoContainer = styled.div`
    display: flex;
    > * {
        margin: 0 0;
        padding: 0 0;

    }

    h2 {
        font-size: 1rem;
        text-decoration: underline;
    }

    ul {
        display: flex;
    }
    
    li {
        margin: 0 0;
    }
    
    @media(max-width: 450px) {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }
    
    @media (max-width: 380px) {
        ul {
            flex-direction: column;
            margin: 0 0;
            padding: 0 0;
        }
        li {
            margin: 0 0;
        }
    }
`;

const StyledBottom = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
`

const StyledTop = styled.div`
    display: flex;
`

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
                //console.log("set p to " + p.name);
                break;
            }
        }
    }, [pokemon, habitats, types, theme, pokemonName, loc])

    return (
        <StyledDiv >

        {p ? (
        <>
            <StyledTop>
            
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
            
            <StyledEvoContainer>
            <h2>Evolution:</h2>
            <EvoChain theme={theme} pokemon={p} allPokemon={pokemon} />           
            </StyledEvoContainer>

            </StyledDescription>

            </StyledRight>
            
            </StyledTop>
            
            <StyledBottom>
            
            <StyledAbilityContainer>
            <h2>Abilities:</h2>
            <AbilityList theme={theme} abilities={p.abilities} />           
            </StyledAbilityContainer>
            
            <StyledMoveContainer>
            <h2>Moves:</h2>
            <MoveList theme={theme} moves={p.moves} />           
            </StyledMoveContainer>
            
            </StyledBottom>
        </>
        ) : <h1>Loading...</h1>
        }
        </StyledDiv>
    ) 
}

export default PokemonDisplay



