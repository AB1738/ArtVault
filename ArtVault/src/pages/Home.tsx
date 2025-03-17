import { useEffect,useContext,CSSProperties } from "react"
import { ArtContext } from "../contexts/ArtContext"
import { Link } from "react-router-dom"
import ArtFilterForm from "../components/ArtFilterForm"
import AddToGallery from "../components/AddToGallery"
import HashLoader from "react-spinners/HashLoader";
import PaginationComponent from "../components/Pagination"




const Home = () => {
    const context=useContext(ArtContext)
    const art=context?.art
    const page=context?.page
    const artQuery=context?.artQuery



    useEffect(()=>{
        const fetchArt=async()=>{
            try{
                context?.setIsLoading(true)
                console.log(`https://api.artic.edu/api/v1/artworks?page=${page}limit=25`)
                const response=await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artQuery}&page=${page}&limit=25&fields=id,api_link,artist_display,image_id,title,thumbnail,artist_titles,place_of_origin,alt_image_ids,category_titles,date_start,date_end,description,artwork_type_title,short_description`)
                const data=await response.json()
                context?.setTotalPages(data.pagination.total_pages)
                const artwork=data.data
                context?.setArt(artwork)
            }catch(e){
                console.error(e)
            }finally{
                context?.setIsLoading(false)
            }
        }
        fetchArt()
    },[page,artQuery])
    const override: CSSProperties = {
        display: "block",
        margin: "100px auto",
      };

  return (
    <div className={context?.isLoading?'home-container loader-container':'home-container'}>
        {context?.isLoading? 
        <HashLoader 
        color='#fff'
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"

        />
        :(
            <>
            <ArtFilterForm/>
            <div className="art-container">
            {art?.map((artItem,index)=>(
                
                <div className="artwork"key={artItem.id} style={{ animationDelay: `${index * 0.15}s` }} >
                

                    <img src={`https://www.artic.edu/iiif/2/${artItem.image_id}/full/400,/0/default.jpg`} alt='' />
                    <div className="artwork-text-container">
                    <h3>{artItem.title}</h3>
                    <p>{artItem.artist_display}</p>
                    </div>
                    <div className="artwork-btn-container">
                    <Link to={`/art/${artItem.id}`} state={{artItem}}>
                    <button className="btn">View</button>
                    </Link>

                    <AddToGallery art={artItem}/>
                    </div>
                    
                </div>
            ))}
    
         </div>
         <div className="pagination">
             <PaginationComponent/>
            </div>
         </>
         )}
    </div>
  )
}

export default Home