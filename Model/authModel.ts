import mongoose from "mongoose";
import { iAuth } from "../utils/interfaces";


interface Auth extends iAuth, mongoose.Document{}

const AuthSchema = new mongoose.Schema<iAuth>({
lastName:{
    type:String,
},
firstName:{
    type:String,
},
contactAddress:{
    type:String,
},
email:{
    type:String,
    unique:true,
    trim:true,
    lowercase:true
},
password:{
    type:String,
},
avatar:{
    type:String,
},
avatarID:{
    type:String,
}
},{timestamps:true})

export default mongoose.model<Auth>("auths",AuthSchema)