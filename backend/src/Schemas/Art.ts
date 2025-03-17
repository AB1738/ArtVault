import mongoose from "mongoose";
import {z} from 'zod'
const { Schema } = mongoose

const artSchema=new Schema({
    id:{type:Number,required:true},
    api_link:{type:String,required:true},
    artist_display:{type:String,required:true},
    image_id:{type:String,required:true},
    title:{type:String,required:true},
    thumbnail:{
        alt_text:{type:String,default: null}
    },
    description:{type:String,default: null},
    short_description:{type:String,default: null},
    artwork_type_title:{type:String,default: null},
    artist_titles:{type:[String],required:true},
    place_of_origin:{type:String,default: null},
    alt_image_ids:{type:[String],default: null},
    category_titles:{type:[String],default: null},
    date_start:{type:Number,required:true},
    date_end:{type:Number,required:true},
    users:[{
         type: mongoose.Schema.Types.ObjectId,
         ref:'User'
    }]
    
    

})

export const Art=mongoose.model('Art',artSchema)

export const artObjectStructure=z.object({
    id:z.number(),
    api_link:z.string(),
    artist_display:z.string(),
    image_id: z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
        message: "An Image is required in order to save to the gallery",
      }),
    title:z.string().nullable().refine((value) => value !== null && value.trim() !== "", {
        message: "A title is required in order to save to the gallery",
      }),
    thumbnail:z.object({
        alt_text:z.string()
    }).nullable(),
    description:z.string().nullable(),
    short_description:z.string().nullable(),
    artwork_type_title:z.string().nullable(),
    artist_titles:z.array(z.string()),
    place_of_origin:z.union([z.string(), z.null()]),
    alt_image_ids:z.array(z.string()).nullable(),
    category_titles:z.array(z.string()).nullable(),
    date_start:z.number(),
    date_end:z.number(),
    users:z.array(z.string()).nullable()
}).passthrough()


export type artType=z.infer<typeof artObjectStructure>














