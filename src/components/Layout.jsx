import React, {useState, useEffect} from "react"
import { Outlet } from "react-router-dom";
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

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 80%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

function Layout({currentUser, setCurrentUser}) {

    const [theme, setTheme] = useState("")
    
    useEffect(() => {
        setTheme(Themes[0]);
        console.log(JSON.stringify(theme));
    }, [])

    return (
    <ThemeProvider theme={Themes[0]}>
      <StyledContainer className='container'>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <ShowPath currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <StyledDivLower className='lower-part'>
          <StyledOutlet className='main-content'>
            <Outlet />
          </StyledOutlet>
        </StyledDivLower>
      </StyledContainer>
    </ThemeProvider>
    )

}

export default Layout
