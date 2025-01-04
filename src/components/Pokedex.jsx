import React, {useState, useEffect, createContext, useContext} from "react"
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import ToggleButton from './ToggleButton.jsx'

const StyledContainer = styled.div`
`;

const Buttons = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const Left = styled.div`
    display: flex;
    column-gap: 0.5rem;
`;

const StyledButton = styled.div`
    button {
        height: 2rem;
        width: 2rem;
        border-radius: 2rem;
        border: 0.20rem solid ${props => props.theme.black};
        background-color: ${props => props.theme.azure};
        margin-bottom: 0.5rem;
    }
`;

const StyledSmallButton = styled.div`
    display: flex;
    column-gap: 0.2rem;
    button {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 0.8rem;
        border: 0.08rem solid ${props => props.theme.black};
        margin-bottom: 0.5rem;
    }

    .red {
        background-color: ${props => props.theme.red};
    }
    
    .yellow {
        background-color: ${props => props.theme.yellow};
    }
    
    .green {
        background-color: ${props => props.theme.green};
    }
`;

function Pokedex({theme, themes, setTheme, toggleTheme})
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
