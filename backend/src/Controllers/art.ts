import { Request, Response } from 'express'
import { artObjectStructure,Art } from '../Schemas/Art'
import { User } from '../Schemas/User'



export const addArtwork=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {art}=req.body
        if(!art){
            throw new Error('Art cant be empty')
        }
        const user=await User.findById(art.users)
        if(user){
        // console.log(art)
        const foundArt=await Art.findOne({id:art.id})
        // console.log('FOUND SRT LOG',foundArt)
        //IF ART IS ALREADY IN DB THEN ADD THE USER ID TO THE USERS ARRAY IN THE COLLECTION AND ADD THE ART ID TO THE ART ARRAY FOR THE USER
        if(foundArt){
            console.log('art exists in database')
            // //if art id is already in the users art array
            console.log(user.art)
            console.log(foundArt._id)
            if(user.art.includes(foundArt._id)){
                const populatedUser=await user.populate('art')
                return res.status(201).json({message:'Art is already saved to your gallery',art:foundArt,user:populatedUser})
            }
            foundArt.users.push(art.users)
            user.art.push(foundArt._id)
            await user.save()
            await foundArt.save()
            const populatedUser=await user.populate('art')
           return res.status(201).json({message:'Artwork added to your gallery',art:foundArt,user:populatedUser})
            // //add user to it
        }

        //ART IS NOT IN THE DB 
        const newArt={...art,users:[art.users]}
        // console.log(newArt)
        // console.log('logging here')
        //client side add a toast message if image-id is null that says it cant be added. Maybe allow others, but image-id is mandatory
        artObjectStructure.parse(newArt)
        const artwork=await new Art(newArt)

        user.art.push(artwork._id)
        await user.save()
        await artwork.save()
        // console.log('---------------')
        // console.log(user)
        // console.log('---------------')

        // console.log(artwork)
        
        
        
        const populatedUser=await user.populate('art')

        return res.status(201).json({message:'Artwork added to your gallery',art:artwork,user:populatedUser})
    }

    }catch(e:any){
        console.log(e._message)
        if(e._message==='Art validation failed'){
            return res.status(400).json({message:"It looks like some information is missing from this artwork. Please make sure it has a title, image, and artist before saving."})
        }
        else
       return res.status(400).json({message:e._message}) 
    }

}

export const deleteArtwork=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {artId}=req.params  //id of the artwork that the user wants to delete
        const {user}=req.body    //the user that is making the request
        const foundUser=await User.findById(user._id)  
        if(!foundUser){                           //checking to see if the user is valid
            throw new Error('User not found')
        }
        const foundArt=await Art.findById(artId) 
        if(!foundArt){                          //checking to see if the art exists as an entry in the db
            throw new Error('Art not found')
        }

        foundUser.art=foundUser.art.filter((artworkId)=>artworkId.toString()!==foundArt._id.toString()) //filtering out the id of the artwork that the usr wants to delete
        console.log('FOUNDUSERS.ART')
        foundArt.users=foundArt.users.filter((usersId)=>usersId.toString()!==foundUser._id.toString()) //filtering the user id out of the artwork entry in the db

        const populatedUser=await foundUser.populate('art')

        if(foundArt.users.length<1){ //remove art from the db if no users have it saved in their gallery
            await foundArt.deleteOne()
            await foundUser.save()

          return res.status(200).json({user:populatedUser,art:'no users have this saved',message:'Artwork successfully deleted'})

        }
        await foundUser.save()
        await foundArt.save()


        
      return  res.status(200).json({user:populatedUser,art:foundArt,message:'Artwork successfully deleted'})


    }catch(e:any){
        res.status(400).json({message:e.message})
    }

}