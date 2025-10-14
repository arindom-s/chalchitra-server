import { Movie } from "../../models/movies.models";
import { Request,Response } from "express";

export const readMoviesFun=async(req:Request,res:Response)=>{
    try{
        const {movie}=req.body;
        const {movie_name}=movie;

        const foundMovie=await Movie.findOne({movie_name:movie_name});
        if(!foundMovie){
            res.status(400).json({
                success:false,
                message:"Couldn't find the movie",
            });
            return;
        }
        res.status(200).json({
            success:true,
            movie:foundMovie
        })
    }catch(err){
        console.error(err);
    }
}