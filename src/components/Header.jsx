import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import Logo from '../../public/images/pokeball.png'

import Logout from './Logout.jsx'

function Header({currentUser, setCurrentUser}) {

    return (
        <div className="panel">
        <a href="/"> <img src={Logo}/> </a>
        <h1>Pokedex</h1> 

        { currentUser.loggedIn ?
            (<div><p>{currentUser.username} ({currentUser.roles})</p>
             <Logout setCurrentUser={setCurrentUser}/></div>) 
            :
            (<Link to='/login'>log in</Link>)
        }
        </div>
    )

}

export default Header

