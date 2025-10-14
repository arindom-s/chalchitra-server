import mongoose from "mongoose";

interface IUser extends Document {
    user_name: string;
    email: string;
    password?: string;
    googleId?: string;
    provider: "local" | "google";
}

const userSchema= new mongoose.Schema(
    {
        user_name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required: function(this:IUser){
                return this.provider==="local";
            }
        },
        googleId:{
            type: String
        },
        provider:{
            type: String,
            enum:["local","google"],
            default:"local"
        }
    },
    {timestamps:true}
);

export const User=mongoose.model<IUser>("Users",userSchema);