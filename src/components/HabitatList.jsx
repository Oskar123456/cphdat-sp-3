import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

const StyledTypeName = styled.li`
    border-radius: 0.4rem;
    padding: 0.1rem;
    padding-top: 0.1rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    border: none;
    margin: 0.1rem 0;
    background-color: transparent;
    text-decoration: underline;
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    
    list-style-type: none;
    
    &:hover {
        cursor: pointer;
    }
    > * {
        border-radius: 0.5rem;
        border: none;
        margin: 0.1rem 0;
        background-color: transparent;
        text-decoration: underline;
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
    }
    & .off {
        text-decoration-line: line-through;
    }
`;

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

function HabitatList({theme, habitats}){

    useEffect(() => {
    }, [theme, habitats])
    
    function makeTypeList()
    {
        if (!habitats || habitats.length < 1)
            return <ul></ul>;
        let lis = habitats.sort((a, b) => (a && b) ? a.name > b.name : false);
        lis = lis.map(h => {
            return h ? ( <StyledTypeName key={crypto.randomUUID()}>
                <Link style={colorCodeHabitat(theme, h)}  to={"/pokedex/habitat/" + h.name}>{capitalizeWord(h.name)}</Link>
                </StyledTypeName>) : <StyledTypeName key={crypto.randomUUID()}></StyledTypeName>;
        });
        return <ul>{lis}</ul>
    }
    
    return (
        <StyledDiv >
            <StyledLeft>
            
            <StyledImgDiv src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fpokemon-world-map-now-with-paldea-and-lental-v0-1shac9d8qx2a1.png%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D9484bd29b5a7246a0c5cf75bd1f2aa302920562b&f=1&nofb=1&ipt=279ead7917fc8e0290e2aefdf8f5ef948728da4fa7e0db7b5e8c413da8b02ba7&ipo=images" />
            
            </StyledLeft>
            
            <StyledRight>
            
            <StyledDescription>
            <h1>List of pokemon habitats</h1> 
            
            <StyledTypeContainer>
            {makeTypeList()}
            </StyledTypeContainer>
            
            </StyledDescription>

            </StyledRight>
        </StyledDiv>
    ) 
}

export default HabitatList

