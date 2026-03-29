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
      {step == 1 && (
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
          
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'>
            <label 
              className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] transition-all duration-200 pointer-events-none ${(inputClicked.email || email.length > 0) ? "top-[-15px] text-xs" : ""}`} 
              htmlFor='email'
            > 
              Enter Your Email 
            </label>
            
            <input 
              className='w-full h-full rounded-2xl px-5 outline-none border-0' 
              type='email' 
              value={email} 
              id='email' 
              onChange={(e) => setEmail(e.target.value)} 
              onFocus={() => setInputClicked({ ...inputClicked, email: true })}
              onBlur={() => setInputClicked({ ...inputClicked, email: false })}
              required 
            />
          </div>

          {err && <p className='text-red-500 mt-2'>{err}</p>}

          <button onClick={handleStep1} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>
            {loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step == 2 && (
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
          
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'>
            <label 
              className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] transition-all duration-200 pointer-events-none ${(inputClicked.otp || otp.length > 0) ? "top-[-15px] text-xs" : ""}`} 
              htmlFor='otp'
            > 
              Enter OTP 
            </label>

            <input 
              className='w-full h-full rounded-2xl px-5 outline-none border-0' 
              type='text' 
              value={otp} 
              id='otp' 
              onChange={(e) => setOtp(e.target.value)} 
              onFocus={() => setInputClicked({ ...inputClicked, otp: true })}
              onBlur={() => setInputClicked({ ...inputClicked, otp: false })}
              required 
            />
          </div>
          
          {err && <p className='text-red-500 mt-2'>{err}</p>}

          <button onClick={handleStep2} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>
            {loading ? <ClipLoader size={30} color='white' /> : "Submit"}
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step == 3 && (
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Reset Password</h2>
          
          {/* New Password Input */}
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'>
            <label 
              className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] transition-all duration-200 pointer-events-none ${(inputClicked.newPassword || newPassword.length > 0) ? "top-[-15px] text-xs" : ""}`} 
              htmlFor='newpassword'
            > 
              Enter New Password 
            </label>
            
            <input 
              className='w-full h-full rounded-2xl px-5 outline-none border-0' 
              type='password' 
              value={newPassword} 
              id='newpassword' 
              onChange={(e) => setNewPassword(e.target.value)} 
              onFocus={() => setInputClicked({ ...inputClicked, newPassword: true })}
              onBlur={() => setInputClicked({ ...inputClicked, newPassword: false })}
              required 
            />
          </div>

          {/* Confirm Password Input */}
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'>
            <label 
              className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] transition-all duration-200 pointer-events-none ${(inputClicked.confirmedPassword || newConfirmPassword.length > 0) ? "top-[-15px] text-xs" : ""}`} 
              htmlFor='confirmpassword'
            > 
              Confirm Password 
            </label>
            
            <input 
              className='w-full h-full rounded-2xl px-5 outline-none border-0' 
              type='password' 
              value={newConfirmPassword} 
              id='confirmpassword' 
              onChange={(e) => setConfirmNewPassword(e.target.value)} 
              onFocus={() => setInputClicked({ ...inputClicked, confirmedPassword: true })}
              onBlur={() => setInputClicked({ ...inputClicked, confirmedPassword: false })}
              required 
            />
          </div>
          
          {err && <p className='text-red-500 mt-2'>{err}</p>}

          <button onClick={handleStep3} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>
            {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}
          </button>
        </div>
      )}

    </div>
  )
}

export default ForgotPassword
