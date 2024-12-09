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
    display: grid;
      align-content: stretch;
    grid-template-columns: 1fr 7fr;
    gap: 1rem;
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
    }, [])

    return (
    <ThemeProvider theme={Themes[0]}>
      <StyledContainer className='container'>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <ShowPath />
        <StyledDivLower className='lower-part'>
          <div className='sidebar'>
            <ul className='menu'>
                <li> <Link to='/home'>Home</Link> </li>
                <li> <Link to='/pokedex'>Pokedex</Link> </li>
                <li> <Link to='/apidocs'>ApiDocs</Link> </li>
            </ul>
          </div>
          <StyledOutlet className='main-content'>
            <Outlet />
          </StyledOutlet>
        </StyledDivLower>
      </StyledContainer>
    </ThemeProvider>
    )

}

export default Layout
