import { Outlet } from "react-router";
import { NavLink, Link } from "react-router";

import Header from './Header.jsx'
import ShowPath from './ShowPath.jsx'

function Layout({currentUser, setCurrentUser}) {

    return (
    <nav>
      <div className='container'>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <ShowPath />
        <div className='lower-part'>
          <div className='sidebar'>
            <ul className='menu'>
                <li> <Link to='/home'>Home</Link> </li>
                <li> <Link to='/trips'>Trips</Link> </li>
                <li> <Link to='/guides'>Guides</Link> </li>
                <li> <Link to='/usertest'>UserTest</Link> </li>
                <li> <Link to='/admintest'>AdminTest</Link> </li>
            </ul>
          </div>
          <div className='main-content'>
            <Outlet />
          </div>
        </div>
      </div>
    </nav>
    )

}

export default Layout
