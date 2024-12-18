import { useRef, useEffect, useState, useContext } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Outlet, useLocation, useParams, useOutletContext } from "react-router-dom";
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
    display: grid;
    grid-template-columns: 1fr 3fr;
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
        border-radius: 0.4rem;
        background-color: ${props => props.theme.poke_gray};
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
    flex-direction: column;
    > * {
        display: flex;
        flex-wrap: wrap;
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

    p {
    }

`;

const StyledImgDiv = styled.img`
    width: 100%;
`;

function HabitatDisplay({currentUser, setCurrentUser, pokemon, habitats, theme}) 
{
    const loc = useLocation();
    const habitatName = useParams();
    const [t, setT] = useState()

    useEffect(() => {
        if (habitats.length < 1) return;
        setT(habitatName);
    }, [theme, habitatName, habitats, loc])

    return (
        <StyledDiv >

        {t ? (
        <>
            <StyledLeft>
            
            <StyledImgDiv src={habitatImageLink(t)}/>
            
            </StyledLeft>
            
            <StyledRight>
            
            <StyledDescription>
            <h1>{capitalizeWord(t.name)} </h1> 
            
            <StyledTypeContainer>
            <p>description...</p>
            </StyledTypeContainer>
            
            </StyledDescription>

            </StyledRight>
        </>
        ) : <h1>Habitat not found...</h1>
        }
        </StyledDiv>
    ) 
}

export default HabitatDisplay




