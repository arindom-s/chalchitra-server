import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.models";
import { Profile } from "passport-google-oauth20";
import { VerifyCallback } from "passport-google-oauth20";

interface IUser{
  id:string;
  user_name:string;
  email:string;
}

passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3010/api/auth/callback"
},
async (
    accessToken:string,
    refreshToken:string,
    profile:Profile,
    done:VerifyCallback
)=>{
    try{
    let user= await User.findOne({
        email:profile.emails?.[0].value
    });
    if(!user){
        user=await User.create({
            user_name: profile.displayName,
            email: profile.emails?.[0].value,
            googleId:profile.id,
            provider: "google"
        })
    }
    return done(null,user as IUser);
    } catch(err) {
        return done(err as Error,undefined)
    }
}
));

