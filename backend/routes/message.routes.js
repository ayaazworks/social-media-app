import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { getAllMessages, getPreviousUserChats, sendMessage } from "../controllers/message.controllers.js";


const messageRouter = express.Router()

messageRouter.post("/send/:receiverId",isAuth,upload.single("image"),sendMessage)
messageRouter.get("/getall/:receiverId",isAuth,getAllMessages)
messageRouter.get("/prevchats",isAuth,getPreviousUserChats)

export default messageRouter