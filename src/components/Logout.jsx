import { useEffect, useState, useActionState } from "react";
import { Outlet } from "react-router";
import { logout } from '../js/Accounts.js'

function Logout({setCurrentUser}) 
{

    function clickCB() {
        logout(setCurrentUser);
    }
    
    return ( <button onClick={clickCB}>log ud</button> )
}

export default Logout



