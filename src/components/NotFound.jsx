import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
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
        width: 90%;
    }
`;

function NotFound() 
{
    return (
        <StyledDiv>
        <h1> 404 Not Found </h1>
        </StyledDiv>
    ) 
}

export default NotFound



