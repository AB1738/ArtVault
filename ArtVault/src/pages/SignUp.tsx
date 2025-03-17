import UserForm from "../components/UserForm"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"

const SignUp = () => {
    const context=useContext(UserContext)
    const isAuthenticated=context?.isAuthenticated
    return (
    <div className="signup-page-container">
        {(typeof isAuthenticated==='boolean'&&isAuthenticated)?(
            <Navigate to='/gallery'/>
        ):(
            <UserForm type='signup'/>
        )}
        <div className="signup-page-img-container"></div>
        
    </div>
    )
}

export default SignUp

