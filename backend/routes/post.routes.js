import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { comment, getAllPost , likePost, savedPost, uploadPost } from "../controllers/post.controllers.js";

const postRouter = express.Router()

postRouter.post("/upload",isAuth,upload.single("media"),uploadPost)
postRouter.get("/getallpost",isAuth,getAllPost)
postRouter.get("/like/:postId",isAuth,likePost)
postRouter.post("/comment/:postId",isAuth,comment)
postRouter.get("/saved/:postId",isAuth,savedPost)

export default postRouter