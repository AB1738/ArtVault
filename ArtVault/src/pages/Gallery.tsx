import { useContext,useEffect, useState,CSSProperties } from "react"
import { UserContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"
import useAuthChecker from "../hooks/useAuthChecker"
import DeleteFromGallery from "../components/DeleteFromGallery"
import { Link } from "react-router-dom"
import Slider from "../components/Slider"
import HashLoader from "react-spinners/HashLoader";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import { RiGalleryView2 } from "react-icons/ri";


const Gallery = () => {
    const context=useContext(UserContext)
    const userArt=context?.userArt
    const isAuthenticated=context?.isAuthenticated
    const [isLoading,setIsLoading]=useState<boolean>(true)
    const [isActiveSlider,setIsActiveSlider]=useState<boolean>(true)
    useEffect(()=>{
        
        const checkAuthOnMount=async()=>{
          const checkAuth=await useAuthChecker(undefined)
          if(checkAuth){
            context?.setIsAuthenticated(checkAuth.authStatus)
          }
          setIsLoading(false)
        }
        checkAuthOnMount()
      },[])
      const toggleView=()=>{
        setIsActiveSlider(prevState=>!prevState)
      }
    const override: CSSProperties = {
        display: "block",
        margin: "100px auto",
    };
  return (
    <div className="gallery-container">
        {isLoading?(
            <div className="loader-container gallery-loader" style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <HashLoader 
            color='#7c444f'
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
    
            />
            </div>
        ):(
    (typeof isAuthenticated==='boolean'&&isAuthenticated)?(
        
        <>
        <div className="gallery-main-text">
            <h1>My Gallery</h1>
            <h3>{context.user?.email}</h3>
            </div>
            <button className="btn toggle-btn" onClick={toggleView}>{isActiveSlider?
           <div className="link-content">
            <p>View Gallery</p>
            <LuGalleryHorizontalEnd/>
           </div>
           :
           <div className="link-content">
            <p>View Art Wall</p>
            <RiGalleryView2/>
           </div>
            }</button>
            <div className="art-container">
                {!isActiveSlider?(
           userArt&&            
            <Slider userArt={userArt}/>
             
                ):(
                    userArt&&userArt.map((art,index)=>(
                        <div key={art.id} className="artwork gallery-artwork" style={{ animationDelay: `${index * 0.15}s` }}>
                            <img src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`} alt='' />
                            <div className="artwork-text-container">
                                <h3>{art.title}</h3>
                                <p>{art.artist_display}</p>
                            </div>
                            <div className="artwork-btn-container">
                                <Link to={`/art/${art.id}`}>
                                     <button className="btn">View</button>
                                </Link>
                                <DeleteFromGallery artId={art._id as string}/>
                             </div>
                        </div>
                )

            )
            )}
 
            </div>

        </>
    ):(
        <Navigate to='/login'/>
    )
        )}

    
</div>
  )
}

export default Gallery





