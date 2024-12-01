import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { fetchWithJwt } from '../js/Accounts.js'

function AdminTest({currentUser}) {

    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchWithJwt("http://localhost:9999/api/protected/admin_demo", 
            setDescription, setDescription);
    }, [])

    return (
        <div className="article">
          <h1>AdminTest</h1>
          <p>{JSON.stringify(description)}</p>
        </div>
    ) 
}

export default AdminTest


