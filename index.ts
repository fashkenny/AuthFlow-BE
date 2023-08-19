import express, { Application } from "express"
import { mainApp } from "./mainApp"
import { DBconnect } from "./config/DB"




const app:Application = express()

const port:number = 5000
mainApp(app)

const server = app.listen(port,()=>{
    DBconnect()
})

process.on("uncaughtException", (error:any)=>{
    console.log("uncaughtException",error)
    process.exit(1)
})

process.on("unhandledRejection", (reason:any)=>{
    console.log("unhandledRejection", reason)
    
    server.close(()=>{
        process.exit(1);
    })
})