import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    background-color: ${props => props.theme.poke_white};
    @media (max-width: 768px) {
        width: 100%;
    }
`;

function Pokedex({currentUser, setCurrentUser}) {

    const [description, setDescription] = useState('');

    return (
        <StyledDiv>
        <h1> Something went wrong! </h1>
        </StyledDiv>
    ) 
}

export default Pokedex



