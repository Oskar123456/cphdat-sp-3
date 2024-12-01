import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function Home() {

    const [description, setDescription] = useState('');

    return (
        <div className="article">
          <h1>article</h1>
          <p></p>
        </div>
    ) 
}

export default Home

