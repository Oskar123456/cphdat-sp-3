import { useRef, useEffect, useState, useContext } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Outlet, useLocation, useParams, useOutletContext } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink, typeImageLink } from "../js/PokeUtils.js";
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

function TypeDisplay({currentUser, setCurrentUser, pokemon, habitats, types, theme}) 
{
    const loc = useLocation();
    const typeName = useParams();
    const [t, setT] = useState()

    const [ddAgainst, setDdAgainst] = useState([])
    const [ddFrom, setDdFrom] = useState([])
    const [hdAgainst, setHdAgainst] = useState([])
    const [hdFrom, setHdFrom] = useState([])
    const [ndAgainst, setNdAgainst] = useState([])
    const [ndFrom, setNdFrom] = useState([])

    function findTypeByName(name) {
        for (let t of types)
            if (t.name === name)
                return t;
        return null;
    }

    useEffect(() => {
        if (types.length < 1 || !findTypeByName(typeName.name))
            return;
        setDdFrom(findTypeByName(typeName.name).double_damage_from.map(str => findTypeByName(str)));
        setDdAgainst(findTypeByName(typeName.name).double_damage_to.map(str => findTypeByName(str)));
        setHdFrom(findTypeByName(typeName.name).half_damage_from.map(str => findTypeByName(str)));
        setHdAgainst(findTypeByName(typeName.name).half_damage_to.map(str => findTypeByName(str)));
        setNdFrom(findTypeByName(typeName.name).no_damage_from.map(str => findTypeByName(str)));
        setNdAgainst(findTypeByName(typeName.name).no_damage_to.map(str => findTypeByName(str)));
        setT(findTypeByName(typeName.name));
    }, [pokemon, habitats, types, theme, typeName, loc])

    return (
        <StyledDiv >

        {t ? (
        <>
            <StyledLeft>
            
            <StyledImgDiv src={typeImageLink(t)} />
            
            </StyledLeft>
            
            <StyledRight>
            
            <StyledDescription>
            <h1>{capitalizeWord(t.name)} </h1> 
            
            <StyledTypeContainer>
            <h2>Double damage against:</h2>
            <TypeList theme={theme} types={ddAgainst} />           
            </StyledTypeContainer>
            
            <StyledTypeContainer>
            <h2>Double damage from:</h2>
            <TypeList theme={theme} types={ddFrom} />           
            </StyledTypeContainer>
            
            <StyledTypeContainer>
            <h2>Half damage against:</h2>
            <TypeList theme={theme} types={hdAgainst} />           
            </StyledTypeContainer>
            
            <StyledTypeContainer>
            <h2>Half damage from:</h2>
            <TypeList theme={theme} types={hdFrom} />           
            </StyledTypeContainer>
            
            <StyledTypeContainer>
            <h2>No damage against:</h2>
            <TypeList theme={theme} types={ndAgainst} />           
            </StyledTypeContainer>
            
            <StyledTypeContainer>
            <h2>No damage from:</h2>
            <TypeList theme={theme} types={ndFrom} />           
            </StyledTypeContainer>
            
            </StyledDescription>

            </StyledRight>
        </>
        ) : <h1>Type not found...</h1>
        }
        </StyledDiv>
    ) 
}

export default TypeDisplay




