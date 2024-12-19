import { useEffect, useState, useActionState } from "react";
import { Outlet } from "react-router-dom";
import { logout } from '../js/Accounts.js'

function Logout({setCurrentUser, setCurrentUserPokemon}) 
{

    function clickCB() {
        logout(setCurrentUser);
        setCurrentUserPokemon([]);
    }
    
    return ( <button onClick={clickCB}>log out</button> )
}

export default Logout



