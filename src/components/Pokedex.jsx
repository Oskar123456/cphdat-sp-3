import React, {useState, useEffect, createContext, useContext} from "react"
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import ToggleButton from './ToggleButton.jsx'

const StyledContainer = styled.div`
`;

function Pokedex({themes, theme, setTheme, toggleTheme})
{

    useEffect(() => {
    }, [theme]);

    return (
        <StyledContainer>
        <Outlet />
        </StyledContainer>
    )
    
}

export default Pokedex;
