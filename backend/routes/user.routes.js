import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, follow, followingList, getAllNotification, getCurrentUser, getProfile, markAsRead, search, suggestedUsers } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/suggested",isAuth,suggestedUsers)
userRouter.get("/getprofile/:userName",isAuth,getProfile)
userRouter.get("/follow/:targetUserId",isAuth,follow)
userRouter.get("/followinglist",isAuth,followingList)
userRouter.get("/search",isAuth,search)
userRouter.get("/getallnotifications",isAuth,getAllNotification)
userRouter.post("/markasread",isAuth,markAsRead)
userRouter.post("/editprofile",isAuth,upload.single("profileImage"),editProfile)

export default userRouter