import mongoose from "mongoose";

const URL = "mongodb://0.0.0.0:27017/DB"

export const DBconnect = async() =>{
try {
    const connect = await mongoose.connect(URL)
    console.log("DB connect")
} catch (error) {
    console.log(error.message)
}
}