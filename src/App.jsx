import React, { useEffect, useState, useActionState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, useOutletContext } from "react-router-dom";

import { fetchResource, fetchWithJwt, checkLogin } from './js/ApiFacade.js';

import Themes from './js/Themes.js'

import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Test from './components/Test.jsx'
import LoginPage from './components/LoginPage.jsx'
import ApiDocs from './components/ApiDocs.jsx'
import Pokedex from './components/Pokedex.jsx'
import AccountPage from './components/AccountPage.jsx'
import PokedexIndex from './components/PokedexIndex.jsx'
import PokedexGallery from './components/PokedexGallery.jsx'
import PokemonDisplay from './components/PokemonDisplay.jsx'
import TypeDisplayList from './components/TypeDisplayList.jsx'
import TypeDisplay from './components/TypeDisplay.jsx'
import HabitatList from './components/HabitatList.jsx'
import HabitatDisplay from './components/HabitatDisplay.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import NotFound from './components/NotFound.jsx'

import './styles/App.css'

function App() 
{
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })
    const [currentUserPokemon, setCurrentUserPokemon] = useState()
    const [theme, setTheme] = useState(Themes[0])
    const [pokemon, setPokemon] = useState([]);
    const [habitats, setHabitats] = useState([])
    const [types, setTypes] = useState([])
    const [themeNr, setThemeNr] = useState(0)


    function toggleTheme() {
        setThemeNr((themeNr + 1) % 2);
        setTheme(Themes[(themeNr + 1) % 2]);
    }

    function updateCurrentPokemon() {
        if (currentUser && currentUser.loggedIn)
            fetchWithJwt("/pokemon/mypokemon", setCurrentUserPokemon, (err) => console.log(err));
    }

    useEffect(() => {
        if (!pokemon || pokemon.length < 1)
            fetchResource("/pokemon", setPokemon, (err) => console.log(err));
        if (!habitats || habitats.length < 1)
            fetchResource("/pokemon/habitat", setHabitats, (err) => console.log(err));
        if (!types || types.length < 1)
            fetchResource("/pokemon/type", setTypes, (err) => console.log(err));

        checkLogin(currentUser, setCurrentUser)
        
        updateCurrentPokemon();
    }, [currentUser]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout setCurrentUserPokemon={setCurrentUserPokemon} theme={theme} 
                currentUser={currentUser} setCurrentUser={setCurrentUser} toggleTheme={toggleTheme} />} errorElement={<ErrorPage />} >
            
                <Route index element={<Home/>} />
                <Route path="home" element={<Home/>} />
                <Route path="test" element={<Test/>} />
                <Route path="apidocs" element={<ApiDocs />}  />
                <Route path="docs" element={<ApiDocs />}  />
                <Route path="login" element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
                <Route path="pokedex">
                
                    <Route index element={<PokedexIndex pokemon={pokemon} types={types} habitats={habitats} 
                        theme={theme} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                
                    <Route path="mycollection" element={<AccountPage currentUserPokemon={currentUserPokemon} 
                        setCurrentUserPokemon={setCurrentUserPokemon} currentUser={currentUser} pokemon={pokemon} 
                        types={types} habitats={habitats} theme={theme} />}/>
                    <Route path="pokemon" element={<PokedexGallery currentUser={currentUser} 
                        currentUserPokemon={currentUserPokemon} pokemon={pokemon} types={types} 
                        habitats={habitats} theme={theme} />}/>
                    <Route path="pokemon/:name" element={<PokemonDisplay pokemon={pokemon} 
                        types={types} habitats={habitats} theme={theme}/>} />
                    <Route path="type" element={<TypeDisplayList types={types} theme={theme} />}/>
                    <Route path="type/:name" element={<TypeDisplay pokemon={pokemon} types={types} 
                        habitats={habitats} theme={theme} />}/>
                    <Route path="habitat" element={<HabitatList habitats={habitats} theme={theme} />}/>
                    <Route path="habitat/:name" element={<HabitatDisplay pokemon={pokemon} types={types} 
                        habitats={habitats} theme={theme} />}/>
                
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    )
    
    return <RouterProvider router={router} />
}

export default App
