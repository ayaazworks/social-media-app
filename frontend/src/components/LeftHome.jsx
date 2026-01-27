import React from 'react'
import logow from "../assets/logo2.png"
import { FaRegHeart } from "react-icons/fa6"
import nodp from "../assets/dpblank.png"
import { useDispatch, useSelector } from 'react-redux'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice'
import axios from 'axios'
import OtherUsers from './OtherUsers'
import { useNavigate } from 'react-router-dom'

const LeftHome = () => {

    const dispatch=useDispatch()
    const navigate= useNavigate()
    const { userData, suggestedUsers } = useSelector(state => state.user)
    const handleLogOut = async () =>{
        try {
            const result = await axios.get(`${serverURL}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-[25%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900'>
            <div className='w-full h-[100px] flex items-center justify-between p-[20px]'>
                <img className='w-20' src={logow} alt='' />
                <FaRegHeart className='text-white w-[25px] h-6.25' />
            </div>
            <div className='flex w-full items-center justify-between gap-2.5 px-[10px] border-b-gray-900 py-2.5 '>

                <div className='flex items-center gap-[10px]'>


                    <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={() => navigate(`/profile/${userData.userName}`)}>
                        <img  src={userData.profileImage || nodp} alt='' className='w-full object-cover' />
                    </div>
                    <div>
                        <div className='text-[18px] text-white font-semibold'>{userData.userName}</div>
                        <div className='text-[15px] text-gray-400 font-semibold'>{userData.name}</div>
                    </div>
                </div>

                <div className='text-blue-500 font-semibold cursor-pointer' onClick={handleLogOut} >Log Out</div>
            </div>

            <div className='w-full flex flex-col gap-5 p-5' >
                <h4 className='text-white text-[19px]'>Suggested Users</h4>
                {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
                    <OtherUsers key={index} user={user} />
                ))}
            </div>

            
        </div>
    )
}

export default LeftHome
