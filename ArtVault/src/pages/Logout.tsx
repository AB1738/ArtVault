import { useContext, useEffect,CSSProperties } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const Logout = () => {
    const context=useContext(UserContext)
    const isAuthenticated=context?.isAuthenticated
    const navigate=useNavigate()
    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        const logout=async()=>{
            try{                            
                const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,{
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    signal
                  })
                  if (!response.ok) {
                    // If the response is not OK, handle the error manually
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Something went wrong');
                  }
                  else if(response.ok){
                    const data=await response.json()
                    console.log(data)
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
                  }

            }catch(e:any)
            {
                console.error(e)
            }
        }
        
        if(!isAuthenticated){
            navigate('/')
        }
        else if(typeof isAuthenticated==='boolean'&&isAuthenticated){
            // console.log('make request to server to log out')
            logout()
            context?.setUser(null)
            setTimeout(() => {
                window.location.assign('/home')
            }, 500);


        }
        return () => {
            controller.abort()
          }
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