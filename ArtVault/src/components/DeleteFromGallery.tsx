import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import { artObjectStructure } from "../contexts/ArtContext"
import { toast } from "react-toastify";

interface idPropType{
artId:string
}
const DeleteFromGallery = ({artId}:idPropType) => {
    const context=useContext(UserContext)
    const user=context?.user

    const handleDelete=async()=>{
        try{
        const response=await fetch(`http://localhost:3000/api/art/${artId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user
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
            // window.location.reload()
        }
        }
    }catch(e){
        console.log(e)
        }
    }

    
  return (
    <button onClick={handleDelete}className="btn">Delete</button>
  )
}

export default DeleteFromGallery
