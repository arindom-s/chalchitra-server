import mongoose from "mongoose";
import mongoose_type_url from "mongoose-type-url"

const MovieSchema=new mongoose.Schema(
    {
        movie_name:{
            type:String,
            required:true
        },
        released_year:{
            type:Number,
            required:true
        },
        cast:{
            type:Array,
            required:true
        },
        image:{
            type:String,
            unique:true,
        },
        reviews:{
            type:String,
        }
    }
)

export const Movie=mongoose.model("Movie", MovieSchema)