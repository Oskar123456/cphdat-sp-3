import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function Home() {

    const [description, setDescription] = useState('');

    return (
        <div className="article">
          <h1>Trips API</h1>
          <p>A simple travel API free to use</p>
        </div>
    ) 
}

export default Home

