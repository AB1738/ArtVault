import { useContext, useEffect,CSSProperties,useRef } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const Logout = () => {
    const context=useContext(UserContext)
    const isAuthenticated=context?.isAuthenticated
    const navigate=useNavigate()
    const timeoutRef = useRef<number|null>(null); 

    useEffect(()=>{
 
        if(!isAuthenticated){
            navigate('/')
        }
        else if(typeof isAuthenticated==='boolean'&&isAuthenticated){
            localStorage.removeItem('authToken')

            context?.setUser(null)
            toast.success('Goodbye! Come back soon!', {
              position: "top-right",
              toastId: 'logout-toast', 
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          })
          timeoutRef.current= setTimeout(() => {
                window.location.assign('/home')
            }, 500);




        }
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);  
          }
        };
    },[])
    const override: CSSProperties = {
        display: "block",
        margin: "100px auto",
    };
  return (
    <div className="loader-container gallery-loader" style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <HashLoader 
    color='#7c444f'
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"

    />
    </div>
  )
}

export default Logout