import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 80%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

function Home() {

    const [description, setDescription] = useState('');

    return (
        <StyledDiv className="article">
        <h1>Pokedex API</h1>
        <p>An index of pokemon from a deployed database fueled by 
        <a href="https://pokeapi.co">pokeapi.co</a> with detailed 
        stats styled in a way that matches the pokemon theme</p>
        </StyledDiv>
    ) 
}

export default Home

