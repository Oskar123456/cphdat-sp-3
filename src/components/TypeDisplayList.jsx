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
        padding: 0.2rem 0;
        overflow: wrap;
    }

    h2 {
        font-size: 1rem;
    }

    ul {
        display: flex;
    }
    
    li {
        margin: 0 0;
        padding: 0.2rem 0.2rem;
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

function TypeDisplayList({currentUser, setCurrentUser, pokemon, habitats, types, theme}) 
{
    
    useEffect(() => {
    }, [types])

    return (
        <StyledDiv >
            <StyledLeft>
            
            <StyledImgDiv src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Fi%2F8a338ef9-a14e-4c93-989b-b510d7b9bad7%2Fdedsu40-c80a23d1-3179-4a89-8f1f-a1599b806335.png&f=1&nofb=1&ipt=935c37765df7543c88ec828b17f543c8304d4abfe74ab56fae4795b0d4cc3208&ipo=images" />
            
            </StyledLeft>
            
            <StyledRight>
            
            <StyledDescription>
            <h1>List of pokemon types</h1> 
            
            <StyledTypeContainer>
            <TypeList theme={theme} types={types} />           
            </StyledTypeContainer>
            
            </StyledDescription>

            </StyledRight>
        </StyledDiv>
    ) 
}

export default TypeDisplayList





