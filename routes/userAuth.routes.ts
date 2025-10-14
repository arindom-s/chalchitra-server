import { Register, SignIn } from "../controller/userAuth.controller";
import express from "express";
import passport from "passport";
import "../utils/authGoogle.utils"
import { Request,Response } from "express";
import { IUser } from "../types/user";
import { generateToken } from "../utils/generatejwt.utils";
const router=express.Router();

router.post("/register", (req, res, next) =>{
  console.log("Register route hit");
  next();
}, Register);

router.post("/signin",(req,res,next)=>{
    console.log("SignIn route hit");
    next();
}, SignIn)

router.get('/google', passport.authenticate(
  'google',
  {scope:['profile','email']}
));

router.get('/callback',
  passport.authenticate('google', {failureRedirect:'/login', session: false}),
  (req:Request,res:Response)=>{
    const user=req.user as IUser;
    if(!user){
      return res.redirect("/login");
    }
    const token=generateToken({
      id:user.id,
      email:user.email
    });
    res.redirect(`http://localhost:5173?token=${token}`);
  }
)

export default router;