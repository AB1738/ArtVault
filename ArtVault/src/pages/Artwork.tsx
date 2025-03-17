import { useLocation,useNavigate  } from "react-router-dom"
import { artObjectStructure } from "../contexts/ArtContext"
import { useEffect, useState,CSSProperties } from "react";
import AddToGallery from "../components/AddToGallery";
import HashLoader from "react-spinners/HashLoader";


const Artwork = () => {

   const location= useLocation()
   const navigate = useNavigate();
   const [artItem,setArtItem]=useState<artObjectStructure|null>(null)
   const [loading,setLoading]=useState<boolean>(true)
  
    useEffect(()=>{
        if(!location.state){
         const url=location.pathname
        const parts = url.split('/');
        const id = parts[2]; 
        const fetchData=async()=>{
        try{
            const response=await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,api_link,artist_display,image_id,title,thumbnail,artist_titles,place_of_origin,alt_image_ids,category_titles,date_start,date_end,description,artwork_type_title,short_description`)
            const data=await response.json()
             setArtItem(data.data)
             setLoading(false)
        }catch(e:any){
            console.log(e)
        }
    }
    fetchData()

        }else{
            setArtItem(location.state.artItem)
            setLoading(false)
        }

    },[])


   const handleClick=():void=>{
    if(location.state){
        navigate(-1);

    }
    else{
        navigate('/home')
    }

   }
       const override: CSSProperties = {
           display: "block",
           margin: "100px auto",
         };
  return (
    <div className="artwork-page-container">
        {loading?(
                    <HashLoader 
                    color='#7c444f'
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
            
                    />
        ):(
        <div className="artwork-container">
            <div className="artwork-grid-container">

                    <div className="artwork-wrapper">
                <img src={`https://www.artic.edu/iiif/2/${artItem?.image_id}/full/400,/0/default.jpg`} alt='' />
                <h3 className="art-title">{artItem?.title}</h3>
                <p className="artist-display">By {artItem?.artist_display}</p>
               {artItem&&(
                    <AddToGallery art={artItem}/>
               )}</div>


                <div className="description-wrapper">
                {artItem?.description&&(
                    <p className="description">{artItem.description.replace(/<[^>]*>/g, "")}</p>

                )}
                    <p className="description">{artItem?.thumbnail.alt_text}</p>
                    </div>
                    <span className="border"></span>

                    <div className="type-and-origin-wrapper">
                        <div className="type-of-art-wrapper">
                    <h4>Type of Artwork</h4>
                    <p className="art-type">{artItem?.artwork_type_title}</p>
                    </div>
                
                    {artItem?.place_of_origin&&(
                        <div className="origin-wrapper">
                        <h4>Place Of Origin</h4>
                        <p className="place-of-origin">{artItem.place_of_origin}</p>
                        </div>

                    )}
                    </div>
                    <div className="contributors-and-categories-wrapper">
                    {artItem?.artist_titles&&artItem?.artist_titles.length>0&&(
                        <div className="artist-names">
                            <h4>Contributors</h4>
                            <ul>
                            {artItem?.artist_titles.map((name:string,idx:number)=>(
                                <li key={idx}>{name}</li>
                            ))}
                            </ul>
                        </div>
                    )}

                    {artItem?.category_titles&&artItem?.category_titles.length>0&&(
                        <div className="category-titles">
                            <h4>Categories</h4>
                            <ul>
                                {artItem?.category_titles.map((category:string,idx:number)=>(
                                    <li key={idx}>{category}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
                    </div>
                    
                    {artItem?.alt_image_ids&&artItem?.alt_image_ids.length>0&&(
                        <div className="alt-art-images-container">
                            <h4>Additional Images</h4>
                        {artItem?.alt_image_ids.map((artImg:string,idx:number)=>{
                            return <img src={`https://www.artic.edu/iiif/2/${artImg}/full/400,/0/default.jpg`} alt=''key={idx} />

                        } )}
                        </div>
                    )}
                    <div className="time-of-creation">
                        {artItem?.date_start===artItem?.date_end?(
                            <p>Created in {artItem?.date_end}</p>
                        ):(
                            <p>Created between <span className="start-date">{artItem?.date_start} </span>
                         and <span className="end-date">{artItem?.date_end}</span></p>
                        )}

                    </div>
                </div>
                )}

                    <button onClick={handleClick} className="btn return-btn">Go Back</button>

    </div>
  )
}

export default Artwork