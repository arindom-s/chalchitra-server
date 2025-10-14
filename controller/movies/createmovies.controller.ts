import { Movie } from "../../models/movies.models";
import { Request,Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
// dotenv.config();
const MOVIE_KEY= process.env.OMDB_API;

export const createMovieFn=async(req:Request,res:Response)=>{
    try{
        const {movie}=req.body;
        const {movie_name,reviews}=movie;
        if(!movie_name || !reviews){
            res.status(400).json({
                success:false,
                message:"Movie information missing"
            })
            return;
        }
        if (!MOVIE_KEY) {
            console.error("OMDB API key missing!");
            return res.status(500).json({ success: false, message: "OMDB API key not set" });
         }
       console.log("OMDB search started")
        const omdbRes = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(movie_name)}&apikey=${MOVIE_KEY}`,
        {timeout:5000}
    );
       console.log("OMDB response received");
        const data=omdbRes.data;
        console.log(data);

        if(data.Response==="False"){
            res.status(404).json({
                success:false,
                message:"Movie not found OMDB"
            });
            return;
        }
        const cast=data.Actors ? data.Actors.split(",").slice(0,3):[];
        const image=data.Poster;
        const released_year=data.Year;

        const newMovie=await Movie.create({
                movie_name,
                released_year,
                cast,
                image,
                reviews
        });
        res.status(201).json({
            success:true,
            message:"New movie has been added",
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server err"
        });
    }
}