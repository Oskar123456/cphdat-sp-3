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

function Layout({currentUser, setCurrentUser}) {

    const [theme, setTheme] = useState("")
    
    useEffect(() => {
        setTheme(Themes[0]);
    }, [])

    return (
    <ThemeProvider theme={Themes[0]}>
      <div className='container'>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <ShowPath />
        <div className='lower-part'>
          <div className='sidebar'>
            <ul className='menu'>
                <li> <Link to='/home'>Home</Link> </li>
                <li> <Link to='/pokedex'>Pokedex</Link> </li>
                <li> <Link to='/apidocs'>ApiDocs</Link> </li>
            </ul>
          </div>
          <div className='main-content'>
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
    )

}

export default Layout
