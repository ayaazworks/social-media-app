import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { comment, getAllLoops, likeLoop, uploadLoop } from "../controllers/loop.controllers.js";


const loopRouter = express.Router()

loopRouter.post("/upload",isAuth,upload.single("media"),uploadLoop)
loopRouter.get("/getall",isAuth,getAllLoops)
loopRouter.get("/like/:loopid",isAuth,likeLoop)
loopRouter.get("/comment/",isAuth,comment)

export default loopRouter