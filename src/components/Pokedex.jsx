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
        <StyledDiv>
        <h1> WIP </h1>
        </StyledDiv>
    ) 
}

export default Home


