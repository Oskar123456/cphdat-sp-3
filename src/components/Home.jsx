import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

const StyledContainer = styled.div`
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${props => props.theme.poke_red};
    border-radius: 1rem;
    border: 0.25rem solid ${props => props.theme.black};
    & > * {
    }
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    background-color: ${props => props.theme.poke_white};
    @media (max-width: 768px) {
        width: 100%;
    }
    
    > * {
        padding: 0.4rem;
    }
    

    a {
        color: ${props => props.theme.poke_black};
        > * {
            padding: 0.4rem;
        }
        border-radius: 0.5rem;
        &:hover {
            background-color: ${props => props.theme.poke_gray};
        }
        img {
            width: 90%;
            border-radius: 1rem;
        }
        &:active {
            background-color: ${props => props.theme.poke_red};
        }
    }
`;

function Home() {

    const [description, setDescription] = useState('');

    return (
        <StyledContainer>
        <StyledDiv className="article">
        <h1>About</h1>
        <p>An index of pokemon from a deployed database fueled by&nbsp; 
        <a href="https://pokeapi.co">pokeapi.co</a> with detailed 
        stats styled in a way that matches the pokemon theme</p>
        </StyledDiv>
        </StyledContainer>
    ) 
}

export default Home

