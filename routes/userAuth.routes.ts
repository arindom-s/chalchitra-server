import { Register, SignIn } from "../controller/userAuth.controller";
import express from "express";
import passport from "passport";
import "../utils/authGoogle.utils"
import { Request,Response } from "express";

const router=express.Router();

router.post("/register", (req, res, next) => {
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
  passport.authenticate('google', {failureRedirect:'/login'}),
  (req:Request,res:Response)=>{
    res.redirect('/');
  }
)

export default router;