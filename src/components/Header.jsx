import { Outlet } from "react-router";
import { NavLink, Link } from "react-router";

import Logo from '/images/logo.jpg'

import Logout from './Logout.jsx'

function Header({currentUser, setCurrentUser}) {

    return (
        <div className="panel">
        <a href="/"> <img src={Logo}/> </a>
        <h1>Trips API</h1> 

        { currentUser.loggedIn ?
            (<div><p>{currentUser.username} ({currentUser.roles})</p>
             <Logout setCurrentUser={setCurrentUser}/></div>) 
            :
            (<Link to='/login'>log ind</Link>)
        }
        </div>
    )

}

export default Header

