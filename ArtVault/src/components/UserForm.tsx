import { useState,FormEvent,useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import useAuthChecker from "../hooks/useAuthChecker"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify";
import { MdLogin } from "react-icons/md";
import { HiPencilSquare } from "react-icons/hi2";


interface UserFormPropType{
  type:string
}

const UserForm = ({type}:UserFormPropType) => {
  const [emailText,setEmailText]=useState<string>('')
  const [passwordText,setPasswordText]=useState<string>('')
  const context =useContext(UserContext)
  const isAuthenticated=context?.isAuthenticated


  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(emailText!==''&&passwordText!==''){
    const sendToServer=async(emailText:string,passwordText:string)=>{
      try{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${type}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',  
          },
          credentials: 'include', 
          body:JSON.stringify({email:emailText,password:passwordText})
        })       
         if (!response.ok) {
          // If the response is not OK, handle the error manually
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        }
      else if(response.ok){
          
        const data=await response.json()
        if(data.authToken){
          localStorage.setItem('authToken',data.authToken)
        }
        // console.log(data.authToken)
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        // console.log('---------------------------')
        // console.log(data)
        // console.log('---------------------------')
        if(data.User){
          context?.setUser(data.User)
          context?.setUserArt(data.User.art)
          const checkAuth=await useAuthChecker(undefined)
          if(checkAuth){
            // console.log('auth status',checkAuth.authStatus)
            context?.setIsAuthenticated(checkAuth.authStatus)
          }

          // console.log(context?.user)
        }

        }
      }catch(e:any){
                    if(e.message==='Failed to fetch'){
                        toast.error('Internal Server Error', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            })
                        console.error('Internal Server Error')
                    }
                    else{
                    toast.error(e.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        })
                    console.error(e.message)
                    }
      }
    }
    sendToServer(emailText,passwordText)
  }
    
    setEmailText('')
    setPasswordText('')
  }

  return (
    
    <div className="main-form-container">
      <h1 className={type==='signup'?'left':'right'}>{type==='signup'?'Join Today!':'Welcome Back!'}</h1>
         {(typeof isAuthenticated==='boolean'&&isAuthenticated)?(
        <Navigate to='/gallery'/>
    ):(
      <form  onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="email">Enter Email</label>
        <input type="email" name="email" id="email" value={emailText} onChange={(e)=>setEmailText(e.target.value)} required/>
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Enter Password</label>
        <input type="password" name="password" id="password" value={passwordText} onChange={(e)=>setPasswordText(e.target.value)} required/>
      </div>
      <div className="btn-wrapper">
      <button type="submit" className={type==='signup'?'btn signup-btn':'btn login-btn'}>{type==='signup'?
      <div className="link-content">
        <p>Sign Up</p>
        <HiPencilSquare/>
      </div>
      :
        <div className="link-content">
          <p>Log In </p>
         <MdLogin/>
        </div> 
        }
        </button>

      </div>
    </form>
    )}
     

    </div>
  )
}

export default UserForm


