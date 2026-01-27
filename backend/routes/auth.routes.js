import express from "express";
import { resetPassword, sendOtpfunc, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controllers.js";

const authRouter = express.Router()


authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.post("/sendotp",sendOtpfunc)
authRouter.post("/verifyotp",verifyOtp)
authRouter.post("/resetpassword",resetPassword)
authRouter.get("/signout",signOut)
export default authRouter