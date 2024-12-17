import React, { useEffect, useState, useActionState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, useOutletContext } from "react-router-dom";

import Themes from './js/Themes.js'

import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import ApiDocs from './components/ApiDocs.jsx'
import Pokedex from './components/Pokedex.jsx'
import PokedexIndex from './components/PokedexIndex.jsx'
import PokemonDisplay from './components/PokemonDisplay.jsx'
import TypeDisplayList from './components/TypeDisplayList.jsx'
import TypeDisplay from './components/TypeDisplay.jsx'
import HabitatList from './components/HabitatList.jsx'
import HabitatDisplay from './components/HabitatDisplay.jsx'
import ErrorPage from './components/ErrorPage.jsx'

import './styles/App.css'

function App() 
{
    
    const url_all_pokemon = "https://exam.obhnothing.dk/api/pokemon";
    const url_all_habitat = "https://exam.obhnothing.dk/api/pokemon/habitat";
    const url_all_type = "https://exam.obhnothing.dk/api/pokemon/type";
    
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })
    const [theme, setTheme] = useState({})
    const [pokemon, setPokemon] = useState([]);
    const [habitats, setHabitats] = useState([])
    const [types, setTypes] = useState([])

    useEffect(() => {
        setTheme(Themes[0]);
        
        fetch(url_all_pokemon).then(r => {
            return r.json();
        }).then(j => {
            setPokemon(j);
        }).catch(e => {
            console.log(e.message);
        });

        fetch(url_all_type).then(r => {
            return r.json();
        }).then(j => {
            setTypes(j);
        }).catch(e => {
            console.log(e.message);
        });

        fetch(url_all_habitat).then(r => {
            return r.json();
        }).then(j => {
            setHabitats(j);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);
    
    return (
        <BrowserRouter basename="/">
        <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser}/>} 
            errorElement={<ErrorPage />}>
        <Route index element={<Home/>} 
            errorElement={<ErrorPage />}/>
        <Route path="/home" element={<Home/>} 
            errorElement={<ErrorPage />} />
        <Route path="/pokedex" element={<Pokedex pokemon={pokemon} types={types} habitats={habitats} theme={theme} />} 
            errorElement={<ErrorPage />}>
        <Route index element={<PokedexIndex pokemon={pokemon} types={types} habitats={habitats} theme={theme} />} 
            errorElement={<ErrorPage />}/>
        <Route path="/pokedex/pokemon" element={<PokedexIndex pokemon={pokemon} types={types} habitats={habitats} theme={theme} 
            errorElement={<ErrorPage />} />}/>
        <Route path="/pokedex/pokemon/:name" element={<PokemonDisplay pokemon={pokemon} types={types} habitats={habitats} theme={theme}/>} 
            errorElement={<ErrorPage />}/>
        <Route path="/pokedex/type" element={<TypeDisplayList types={types} theme={theme} 
            errorElement={<ErrorPage />} />}/>
        <Route path="/pokedex/type/:name" element={<TypeDisplay pokemon={pokemon} types={types} habitats={habitats} theme={theme} 
            errorElement={<ErrorPage />} />}/>
        <Route path="/pokedex/habitat" element={<HabitatList habitats={habitats} theme={theme} 
            errorElement={<ErrorPage />} />}/>
        <Route path="/pokedex/habitat/:name" element={<HabitatDisplay pokemon={pokemon} types={types} habitats={habitats} theme={theme} 
            errorElement={<ErrorPage />} />}/>
        </Route>
        <Route path="/apidocs" element={<ApiDocs/>} />
        </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App
