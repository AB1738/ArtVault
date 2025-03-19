
import { userObjectStructure } from "../contexts/UserContext"
  interface authResponseStructure{
    message:string,
    authStatus:boolean,
    user:userObjectStructure|null
  }

 
  
  
  const useAuthChecker=async(signal:AbortSignal|undefined)=>{
    const token=localStorage.getItem('authToken')
    if(token){

    
    try{
        const checkAuth=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/isAuthenticated`,{
            method: 'GET',
            headers: {
             'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal
          })
          if (!checkAuth.ok) {
            throw new Error('Failed to authenticate');
          }
          const authResponse:authResponseStructure=await checkAuth.json()
          console.log(authResponse)
        //   console.log('FROM CUSTOM HOOK UP TOP')
          return authResponse

    }catch(e){
         console.error()
    }
  }
  }
  export default useAuthChecker