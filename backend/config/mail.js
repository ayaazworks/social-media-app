import nodeMailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,             // CHANGED from 465 to 587
    secure: false,         // CHANGED to false (required for port 587)
    requireTLS: true,      // ADDED to force encryption after connecting
    auth: {
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
