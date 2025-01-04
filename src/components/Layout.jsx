import React, {useState, useEffect, createContext, useContext} from "react"
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import Themes from '../js/Themes.js'

import Header from './Header.jsx'
import ShowPath from './ShowPath.jsx'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledDivLower = styled.div`
`;

const StyledOutlet = styled.div`
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledContainerOuter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 75%;
    margin-bottom: 2rem;
    @media (max-width: 768px) {
        width: 95%;
    }
`;

const StyledOuter = styled.div`
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
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
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
        font-size: 1.2rem;
        padding-left: 0.4rem;
        > h2 {
            font-size: 2rem;
            margin: 0 0; 
        }
        @media (max-width: 800px) {
            h2 {
                font-size: 1.5rem;
            }
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

import ToggleButton from './ToggleButton.jsx'

const StyledContainer = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${props => props.theme.poke_red};
    border-radius: 1rem;
    border: 0.25rem solid ${props => props.theme.black};
    & > * {
    }
    button {
        &:hover {
            cursor: pointer;
        }
    }
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

function Layout({currentUser, setCurrentUser, setCurrentUserPokemon, theme, toggleTheme}) {

    useEffect(() => {
    }, [theme])

    return (
    <ThemeProvider theme={theme}>
      <StyledContainerOuter className='container'>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <ShowPath currentUser={currentUser} setCurrentUser={setCurrentUser} setCurrentUserPokemon={setCurrentUserPokemon} />
        <StyledDivLower className='lower-part'>
          <StyledOutlet className='main-content'>
        
                <StyledContainer>

                <Buttons>
                <Left>
                <StyledButton>
                <button></button>
                </StyledButton>
                <StyledSmallButton>
                <button className="red"></button>
                <button className="yellow"></button>
                <button className="green"></button>
                </StyledSmallButton>
                </Left>

                <ToggleButton callBack={toggleTheme} />
                
                </Buttons>
                
                <div>
                <Outlet />
                </div>
                
                </StyledContainer>
        
          </StyledOutlet>
        </StyledDivLower>
      </StyledContainerOuter>
    </ThemeProvider>
    )

}

export default Layout
