import React, {useState, useEffect, createContext, useContext} from "react"
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import pokedex_top_2 from '../images/poke_top_2.svg'

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

function Pokedex()
{

    useEffect(() => {
    }, []);

    return (
        <StyledContainer>
        <Outlet />
        </StyledContainer>
    )
    
}

export default Pokedex;
