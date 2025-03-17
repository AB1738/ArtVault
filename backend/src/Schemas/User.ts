import mongoose from "mongoose";
import { artType } from "./Art";
const { Schema } = mongoose

const userSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    art:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Art'
    }]

})



export const User=mongoose.model('User',userSchema)

export interface UserType{
    _id:string|null
    email:string,
    password:string,
    art:string[]|null
}