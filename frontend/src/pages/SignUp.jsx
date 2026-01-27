import { useState } from 'react'
import logo from "../assets/logoblack.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import logo_white from '../assets/logo2.png';
import { serverURL } from '../App';
import axios from 'axios'
import {ClipLoader} from "react-spinners"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';


const SignUp = () => {
  const [inputClicked,setInputClicked] = useState({
    name:false,
    userName:false,
    email:false,
    password:false
  })

  const navigate = useNavigate()
  const [showPassword,setShowPassword] = useState(false)
  const [name,setName] = useState("")
  const [userName,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [err,setErr] =useState("")
  const dispatch = useDispatch()
  
  const handleSignup = async () =>{
    setLoading(true)
    setErr("")

    try {
      const result = await axios.post(`${serverURL}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
      console.log(result.data)
      dispatch(setUserData(result.data))
      setLoading(false)
    } catch (error) {
      setErr(error.response?.data?.message)
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-screen bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

        <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-2.5 gap-5'>

          <div className='flex gap-2.5 items-center text-5 font-semibold mt-10 '>
            <span>Sign up to</span>
            <img className='w-[70px]' src={logo} alt='logo' />
          </div>

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black'>
            <label className={` text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.name?"top-[-15px]":""} cursor-auto`} htmlFor='name' onClick={() => setInputClicked({...inputClicked,name:true})}  > Enter Your Name </label>
              <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={name} id='name' onChange={(e)=> setName(e.target.value)} required />         
          </div>

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'>
            <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.userName?"top-[-15px]":""} cursor-auto`} htmlFor='username' onClick={() => setInputClicked({...inputClicked,userName:true})}> Enter Username </label>
              <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={userName} id='username' onChange={(e)=> setUserName(e.target.value)} required />         
          </div>

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'>
            <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.email?"top-[-15px]":""} cursor-auto`} htmlFor='email' onClick={() => setInputClicked({...inputClicked,email:true})}> Enter Your Email </label>
              <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type='text' value={email} id='email' onChange={(e)=> setEmail(e.target.value)} required />         
          </div>

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'>
            <label className={`text-gray-700 absolute left-5 p-[5px] bg-white text-[15px] ${inputClicked.password?"top-[-15px]":""} cursor-auto`} htmlFor='password' onClick={() => setInputClicked({...inputClicked,password:true})}> Enter Your password </label>
              <input className='w-full h-full rounded-2xl px-5 outline-none border-0' type={showPassword?"text":"password"} value={password} id='password' onChange={(e)=> setPassword(e.target.value)} required />

              {!showPassword?<IoIosEye className='absolute cursor-pointer right-5 w-[25px] h-[25px]' onClick={() => setShowPassword(true)} />:<IoIosEyeOff className='absolute cursor-pointer right-5 w-[25px] h-[25px]' onClick={() => setShowPassword(false)} />}
          </div>

          {err && <p className='text-red-500'>{err}</p>}
          <button onClick={handleSignup} disabled={loading} className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5'>{loading?<ClipLoader size={30} color='white' />:"Sign up"}</button>

          <p onClick={()=>navigate("/signin")} className=' text-gray-800 cursor-pointer '> Already Have an Account ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign in</span></p>
        </div>


        <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] test-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>
        <img className='w-[40%]' src={logo_white} alt='' />
        <p className='text-white'>Not Just A Platform , It's A VYBE</p>

        </div>

      </div>

    </div>
  )
}

export default SignUp
