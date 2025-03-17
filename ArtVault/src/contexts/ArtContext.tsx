import { createContext, useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import {z} from 'zod'

export const ArtSchema=z.object({
    id:z.number(),
    api_link:z.string(),
    artist_display:z.string(),
    image_id:z.string(),
    title:z.string(),
    thumbnail:z.object({
        alt_text:z.string()
    }),
    description:z.string(),
    short_description:z.string(),
    artwork_type_title:z.string(),
    artist_titles:z.array(z.string()),
    place_of_origin:z.string(),
    alt_image_ids:z.array(z.string()),
    category_titles:z.array(z.string()),
    date_start:z.number(),
    date_end:z.number()

}).passthrough()


export type artObjectStructure=z.infer<typeof ArtSchema>

interface artContextType{
    art:artObjectStructure[],
    setArt:(art:artObjectStructure[])=>void,
    artQuery:string,
    setArtQuery:(artQuery:string)=>void
    isLoading:boolean,
    setIsLoading:(isLoading:boolean)=>void,
    page:number,
    setPage: (updater: (prevPage: number) => number) => void,
    totalPages:number,
    setTotalPages:(totalPages:number)=>void
}

export const ArtContext=createContext<artContextType|null>(null)


const ArtContextProvider=({children}:{children:React.ReactNode})=>{
    const [art,setArt]=useState<artObjectStructure[]>([])
    const [artQuery,setArtQuery]=useState<string>('')
    const [totalPages,setTotalPages]=useState<number>(0)
    const [page,setPage]=useState<number>(1)
    const [isLoading,setIsLoading]=useState<boolean>(false)

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname,art]);
    
    useEffect(()=>{
        setPage(1)
    },[artQuery])

    return(
        <ArtContext.Provider value={{art,isLoading,setArt,setIsLoading,totalPages,setTotalPages,page,setPage,artQuery,setArtQuery}}>
            {children}
        </ArtContext.Provider>
    )
}

export default ArtContextProvider