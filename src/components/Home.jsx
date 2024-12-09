import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function Home() {

    const [description, setDescription] = useState('');

    return (
        <div className="article">
        <h1>Pokedex API</h1>
        <p>An index of pokemon from a deployed database fueled by 
        <a href="https://pokeapi.co">pokeapi.co</a> with detailed 
        stats styled in a way that matches the pokemon theme</p>
        </div>
    ) 
}

export default Home

