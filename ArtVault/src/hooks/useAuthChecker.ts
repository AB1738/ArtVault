
import { userObjectStructure } from "../contexts/UserContext"
  interface authResponseStructure{
    message:string,
    authStatus:boolean,
    user:userObjectStructure|null
  }

 
  
  
  const useAuthChecker=async(signal:AbortSignal|undefined)=>{
    try{
        const checkAuth=await fetch('http://localhost:3000/api/users/isAuthenticated',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal
          })
          if (!checkAuth.ok) {
            throw new Error('Failed to authenticate');
          }
          const authResponse:authResponseStructure=await checkAuth.json()
        //   console.log(authResponse)
        //   console.log('FROM CUSTOM HOOK UP TOP')
          return authResponse

    }catch(e){
         console.error()
    }

  }
  export default useAuthChecker