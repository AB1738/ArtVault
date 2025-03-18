import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {User,UserType} from '../Schemas/User'


export const registerUser=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!email||!password){
            throw new Error('Missing email or password field')
        }
        if(!emailRegex.test(email)){
            throw new Error('Invalid Email')
        }
        const userExists=await User.findOne({email})
        if(userExists){
            throw new Error('User with email already exists')
        }
        const hashedPassword= await bcrypt.hash(password, 10)
        const newUser=await new User({email,password:hashedPassword})
        await newUser.save()
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET as string)
        res.cookie('authToken', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000  
          });

        res.status(201).json({message:`Account successfully created`,User:newUser})
    }catch(e:any){
        res.status(409).json({message:e.message})
    }
}

export const loginUser=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body
        const user:UserType|null=await User.findOne({email})


        if(!user){
            throw new Error('Email not found')//change this to a more generic message
        }
       const isCorrectPassword= await bcrypt.compare(password, user.password)
       if(isCorrectPassword){
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET as string)
        const foundUser=await User.findById(user._id).populate('art')

        console.log(token)
        console.log(foundUser)
        res.cookie('authToken', token, {
            httpOnly: true,  
            secure: true, 
            sameSite: 'none',
            maxAge: 604800000  
          });
        //   Before you send the user object the the client, remove unneccesary fields and POPULATE the art field if its not empty

        res.status(200).json({message:'Welcome Back!',User:foundUser})
       }else{
        res.status(401).json({message:'Invalid credentials'})
       }
    }catch(e:any){
        res.status(401).json({message:e.message})
    }
}

export const checkAuth=async(req:Request,res:Response)=>{
    res.status(200).json({message:'request received'})
}

export const logOut=async(req:Request,res:Response)=>{
    try{
    const {authToken}=req.cookies
    if(!authToken){
        throw new Error('Missing authorization token')
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET as string)
    if(typeof decodedToken === 'object' && decodedToken !== null){
      const user:UserType|null=await User.findById(decodedToken.id)
        if(user){
            console.log('cookie should be cleared')
            res.clearCookie('authToken', {
                httpOnly: true,  
                secure: true, 
                sameSite: 'none',
              }).json({message:'Goodbye! Come back soon!'})

        }else{
            throw new Error('Invalid authorization token')
        }
    }

}
    catch(e:any){
        res.status(400).json({message:e.message})
    }
}


