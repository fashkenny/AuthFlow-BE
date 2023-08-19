import express, { Request, Response, json } from "express"
import authModel from "../Model/authModel"
import bcrypt from "bcrypt"
import cloudinary from "../config/cloudinary"



export const registerUser = async (req: any, res: Response) => {
    try {
        const { lastName, firstName, email, password, contactAddress } = req.body

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file?.path!)

        const user = await authModel.create({
            lastName,
            firstName,
            email,
            contactAddress,
            password:hash,
            avatar:secure_url,
            avatarID:public_id,
        })
        return res.status(200).json({
            message:"user created successfully",
            data: user
        })
    } catch (error) {
        return res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

export const signInUser = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body
        const user:any = await authModel.findOne({
            email,
        })
        if(user){
            const checked = await bcrypt.compare(password, user.password!)

            if(checked){
                return res.status(200).json({
                    message:"user found",
                    data: user
                })
            }else{
                return res.status(401).json({
                    message:"user not found",
                })
            }
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const getUsers = async(req:Request,res:Response) =>{
    try {
        const user = await authModel.find().sort({createdAt: -1});
        return res.status(200).json({
            message: "Users gotten successfully",
            data: user
        })
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

export const getOneUser = async(req:Request,res:Response) => {
  try {
    const {userID} = req.params
    const user = await authModel.findById(userID)

    return res.status(200).json({
        message: "  Success getting a user",
        data: user
    })
  }
  catch (error) {
    return res.status(404).json({message: error.message})
  }  
}


export const deleteUser = async(req:Request,res:Response) => {
try {
    const {userID} = req.params
    const user = await authModel.findByIdAndDelete(userID)

    return res.status(200).json({
        message: "  deleted user successfully",
        data: user
    })

} catch (error) {
    return res.status(404).json({message: error.message})
}
}