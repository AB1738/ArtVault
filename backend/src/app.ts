import express, { Express} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import ArtRoutes from './Routes/art'
import UserRoutes from './Routes/users'
export const app:Express=express()


dotenv.config()
const PORT=process.env.PORT||3000
const URI=process.env.MONGO_URI


app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true, 
}))
app.use((req,res,next)=>{
    const origin = req.headers.origin; 
    
    if (origin&& origin === process.env.CLIENT_URL) {
        res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);  
      }
    
  
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  

  
    next();
})


  
app.use('/api/art',ArtRoutes)
app.use('/api/users',UserRoutes)

if(URI){
    mongoose.connect(URI).then(()=>{
        console.log('connected to db')
        app.listen(PORT,()=>console.log('listening on port 3000'))
    }).catch((e:Error)=>{
        console.error(e)
    })

}


