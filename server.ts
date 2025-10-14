import express from "express";
import { Request,Response } from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

import mongoose from "mongoose";
import authRouter from "./routes/userAuth.routes";
import movieRouter from "./routes/movies.routes";

const app=express();

app.use(cors());

const port=3010;


app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);

mongoose.connect(process.env.MONGO_URI as string)
.then(()=>{
  console.log("MongoDB connected!");
  app.listen(port,()=>{
    console.log("Server and DB running");
  });
})
.catch((err)=>{
  console.error("MongoDB error",err);
});
