import express, { Router } from "express"
import { deleteUser, getOneUser, getUsers, registerUser, signInUser } from "../Controller/authController"
import { upload } from "../config/multer"

const router= Router() 


router.route("/register").post(upload,registerUser)
router.route("/signIn").post(signInUser)
router.route("/getUsers").get(getUsers)
router.route("/getOne").get(getOneUser)
router.route("/deleteUser").delete(deleteUser)

export default router