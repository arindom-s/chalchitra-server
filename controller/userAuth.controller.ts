import { User } from "../models/user.models";
import { Request,Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generatejwt.utils";

export const Register=async(req:Request,res:Response)=>{
  try{
    const {user}=req.body;
    const {user_name,email,password}=user;
    const emailExists=await User.findOne({
        email:email,
    });
    if(emailExists){
        res.status(400).json({
            message: "Email already exists",
        });
        return;
    }
    const saltRounds=8;
    const hashedPassword=await bcrypt.hash(password,saltRounds);

    const newUser= await User.create({
        user_name,
        email,
        password:hashedPassword,
    });
    const token=generateToken({id:newUser._id, email:newUser.email});
    res.status(200).json({
        success:true,
        message: "User created successfully!",
        user:newUser,
        token,
    });
  }
  catch(error:any){
    console.log(error);
    res.status(400).json({
        message:error.message.toString(),
    })
  }
}

export const SignIn=async(req:Request,res:Response)=>{
  try{
    const {user}=req.body;
    const {email,password}=user;

    const foundUser=await User.findOne({email:email});
    if(!foundUser){
      return res.status(401).json({
        success:false,
        message: "Email is not registered",
      });
    }
    const isMatchPassword= await bcrypt.compare(password,foundUser.password);
    if(!isMatchPassword){
      return res.status(401).json({
        success:false,
        message: "Incorrect password",
      });
    }
    const token=generateToken({id:foundUser._id, email: foundUser.email});
    return res.status(200).json({
      success:true,
      message:"Logged in successfully!",
      user:{
        _id:foundUser._id,
        user_name: foundUser.user_name,
        email:foundUser.email,
      },
      token,
    })
  }
  catch(error:any){
    console.log(error);
    res.status(400).json({
      message:error.message.toString(),
    })
  }
}