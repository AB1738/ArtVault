import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction,RequestHandler  } from 'express';
import {User,UserType} from '../Schemas/User'

interface tokenStructure{
    id:any,
    iat:any
}


const isLoggedIn:RequestHandler =async(req:Request,res:Response,next:NextFunction)=>{

            const token=req.headers.authorization?.split(' ')[1]
console.log(token)
     const{authToken}=req.cookies
    try{
        if(token){
            //user is already logged in
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
            
            if(typeof decodedToken === 'object' && decodedToken !== null){
                // console.log('decodedTOKEN',decodedToken)
              const user=await User.findById(decodedToken.id).populate('art')
              res.status(200).json({message:'Already logged in',authStatus:true,user:user})

            }
 
        }else{
            res.status(200).json({message:'Missing Authorization token',authStatus:false})
        }

    }catch(e){
        console.error(e)
         res.status(400).json({message:'Invalid token',authStatus:false})

    }



}
export default isLoggedIn

