import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from "axios"
import { serverURL } from '../App'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmedPassword: false
  })
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newConfirmPassword, setConfirmNewPassword] = useState("")
  const [err, setErr] = useState("")

  const handleStep1 = async () => {
    setLoading(true)
    setErr("")
    try {
      const result = await axios.post(`${serverURL}/api/auth/sendotp`, { email }, { withCredentials: true })
      setLoading(false)
      console.log(result.data)
      setStep(2)
    } catch (error) {
      setLoading(false)
      setErr(error.response?.data?.message)
    }
  }

  const handleStep2 = async () => {
    setLoading(true)
    setErr("")
    try {
      const result = await axios.post(`${serverURL}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
      setLoading(false)
      console.log(result.data)
      setStep(3)
    } catch (error) {
      setLoading(false)
      setErr(error.response?.data?.message)
    }
  }

  const handleStep3 = async () => {
    setLoading(true)
    setErr("")
    try {
      if (newPassword !== newConfirmPassword) {
        setLoading(false)
        return setErr("Passwords do not match")
      }
      
      const result = await axios.post(`${serverURL}/api/auth/resetpassword`, { email, password: newPassword }, { withCredentials: true })
      setLoading(false)
      navigate("/signin")
      console.log(result.data)
    } catch (error) {
      setLoading(false)
      setErr(error.response?.data?.message)
    }
  }

  return (


    <div className='w-full h-screen bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center'>

      {/* STEP 1 */}
      {step == 1 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
        <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
        <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'>
          <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-15px]" : ""} cursor-auto`} htmlFor='email' onClick={() => setInputClicked({ ...inputClicked, email: true })}> Enter Your Email </label>
          <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={email} id='email' onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {err && <p className='text-red-500'>{err}</p>}

        <button onClick={handleStep1} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>{loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}</button>

      </div>}

      {/* STEP 2 */}

      {step == 2 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
        <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
        <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'>

          <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.otp ? "top-[-15px]" : ""} cursor-auto`} htmlFor='otp' onClick={() => setInputClicked({ ...inputClicked, otp: true })}> Enter OTP </label>

          <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={otp} id='otp' onChange={(e) => setOtp(e.target.value)} required />
        </div>
        {err && <p className='text-red-500'>{err}</p>}


        <button onClick={handleStep2} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>{loading ? <ClipLoader size={30} color='white' /> : "Submit"}</button>

      </div>}

      {/* STEP 3 */}

      {step == 3 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
        <h2 className='text-[30px] font-semibold'>Reset Password</h2>
        <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'>
          <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? "top-[-15px]" : ""} cursor-auto`} htmlFor='newpassword' onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}> Enter New Password </label>
          <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={newPassword} id='newpassword' onChange={(e) => setNewPassword(e.target.value)} required />
        </div>

        <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'>

          <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.confirmedPassword ? "top-[-15px]" : ""} cursor-auto`} htmlFor='confirmpassword' onClick={() => setInputClicked({ ...inputClicked, confirmedPassword: true })}> Confirm Password </label>
          <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={newConfirmPassword} id='confirmpassword' onChange={(e) => setConfirmNewPassword(e.target.value)} required />
        </div>
        {err && <p className='text-red-500'>{err}</p>}


        <button onClick={handleStep3} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>{loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}</button>

      </div>}




    </div>
  )
}

export default ForgotPassword
