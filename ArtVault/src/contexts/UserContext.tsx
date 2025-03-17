import { createContext, useEffect, useState } from "react";
import { ArtSchema } from "./ArtContext";
import { artObjectStructure } from "./ArtContext";
import useAuthChecker from "../hooks/useAuthChecker";
import {z} from 'zod'


const UserSchema=z.object({
    _id:z.string(),
    email:z.string(),
    art:z.array(ArtSchema).nullable(),

})


export type userObjectStructure=z.infer<typeof UserSchema>

interface userContextType{
    userArt:artObjectStructure[],
    setUserArt: React.Dispatch<React.SetStateAction<artObjectStructure[]>>,
    user:userObjectStructure|null,
    setUser:(user:userObjectStructure|null)=>void
    isAuthenticated:boolean,
    setIsAuthenticated:(isAuthenticated:boolean)=>void

}

export const UserContext=createContext<userContextType|null>(null)


const UserContextProvider=({children}:{children:React.ReactNode})=>{
    const [user,setUser]=useState<userObjectStructure|null>(null)
    const [userArt,setUserArt]=useState<artObjectStructure[]>([])
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false)

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        const checkAuthOnMount=async()=>{
            
          const checkAuth=await useAuthChecker(signal)
          if(checkAuth){
            setUser(checkAuth.user)
            setIsAuthenticated(checkAuth.authStatus)
            if(checkAuth.user?.art&&checkAuth.user.art.length>0){
                const newArt= checkAuth.user.art.filter((artwork:artObjectStructure)=>{
                   return !userArt.includes(artwork)
                 })
                 setUserArt(newArt)
            }

          }
        }
        checkAuthOnMount()
        return () => {
            controller.abort()
          }
      
      },[])


    return(
        <UserContext.Provider value={{userArt,setUserArt,isAuthenticated,setIsAuthenticated,user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider