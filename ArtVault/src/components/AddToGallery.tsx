import { artObjectStructure } from "../contexts/ArtContext"
import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import { toast } from "react-toastify";




interface artPropType{
    art:artObjectStructure
}
const AddToGallery = ({art}:artPropType) => {
    const context=useContext(UserContext)
    const isAuthenticated=context?.isAuthenticated
    const user=context?.user
    const add=async()=>{
        try{

        
        const response=await fetch(`http://localhost:3000/api/art/${art.id}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                art: {
                  ...art,
                  users: user?._id
                }
              })
        })
        if (!response.ok) {
            // If the response is not OK, handle the error manually
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
          }
        else if(response.ok){

        const data=await response.json()
        console.log(data)
        
        if(data&&data.user&&data.user.art){    ///data.user.art is an array of objects
           const newArt= data.user.art.filter((artwork:artObjectStructure)=>{
              return !context?.userArt.includes(artwork)
            })
            context?.setUserArt(newArt)
            if(data.message=="Art is already saved to your gallery"){
                toast.info(data.message, {
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
            else{
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

        }
        }}catch(e:any){
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
  return (
    
     (typeof isAuthenticated === "boolean" && isAuthenticated) && (
        <button onClick={add} className="btn add-to-gallery-btn">Add to gallery</button>
      )

  )
}

export default AddToGallery