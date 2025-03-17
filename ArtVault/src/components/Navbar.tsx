import { Link,NavLink } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

const Navbar = () => {
const context=useContext(UserContext)
const isAuthenticated=context?.isAuthenticated
  return (
    <nav className="navbar">
        <Link to='/home'>
         <div className="brand-name">ArtVault</div>
        </Link>
        <ul>
            {(typeof isAuthenticated==='boolean'&&isAuthenticated)?(
             <>
                <NavLink to='/logout'> 
                    <li>Logout</li>
                </NavLink>
                <NavLink to='/gallery'>
                     <li>User Gallery</li>
                </NavLink>
              </>
            ):(
             <>
              <NavLink to='/signup'> 
                <li>Sign up</li>
              </NavLink>
              <NavLink to='login'>
                <li>Log In</li>
             </NavLink>
            </>
            )}

        </ul>
    </nav>
  )
}

export default Navbar
