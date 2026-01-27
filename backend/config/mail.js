import nodeMailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodeMailer.createTransport({
    service:"Gmail",
    port:465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }

});

const sendOtp = async (receiver,otp) =>{
    await transporter.sendMail({
        from:`${process.env.EMAIL}`,
        to:`${receiver}`,
        subject:"Reset Your Password",
        html: `<p> Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}
export default sendOtp