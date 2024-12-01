import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { fetchWithJwt } from '../js/Accounts.js'

function UserTest({currentUser}) {

    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchWithJwt("http://localhost:9999/api/protected/user_demo", 
            setDescription, setDescription);
    }, [])

    return (
        <div className="article">
          <h1>UserTest</h1>
          <p>{JSON.stringify(description)}</p>
        </div>
    ) 
}

export default UserTest


