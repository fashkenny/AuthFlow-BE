import cors from "cors";
import express, { Application,Request,Response } from "express";
import auth from "./Router/authRouter"



export const mainApp = (app: Application)=>{
    app
    .use(express.json())
    .use(cors({
        origin:"*",
        methods:["GET","POST","PATCH","DELETE"]
    }))

    .get("/",(req:Request,res:Response) => {
        return res.status(200).json({
            message:"Success"
        })
    })

    .use("/api/v1",auth)
};