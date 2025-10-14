import { createMovieFn } from "../controller/movies/createmovies.controller";
import { readMoviesFun } from "../controller/movies/readmovies.controller";
import express from "express";

const router=express.Router();

router.post("/create", (req,res,next)=>{
    console.log("Create Movie route hit");
    next();
},createMovieFn);
router.get("/",readMoviesFun)

export default router;