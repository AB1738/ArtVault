import { useContext } from "react"
import UserForm from "../components/UserForm"
import { UserContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"
const LogIn = () => {
    const context=useContext(UserContext)
    const isAuthenticated=context?.isAuthenticated
  return (
    <div className="login-page-container">

        <div className="login-page-img-container"></div>

        {(typeof isAuthenticated==='boolean'&&isAuthenticated)?(
            <Navigate to='/gallery'/>
        ):(
            <UserForm type='login'/>
        )}
        
    </div>
  )
}

export default LogIn