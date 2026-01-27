import React from 'react'
import { useSelector } from 'react-redux'
import nodp from "../assets/dpblank.png"
import { useNavigate } from 'react-router-dom'
import FollowButton from './FollowButton'

const OtherUsers = ({user}) => {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    return (
        <div className='w-full h-20 flex items-center justify-between border-b-2 border-gray-800'>
            <div className='flex items-center gap-[10px]'>
                <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={() => navigate(`/profile/${user.userName}`)}>
                    <img src={user.profileImage || nodp} alt='' className='w-full object-cover' />
                </div>
                <div>
                    <div className='text-[18px] text-white font-semibold'>{user.userName}</div>
                    <div className='text-[15px] text-gray-400 font-semibold'>{user.name}</div>
                </div>
            </div>
            <FollowButton tailwind={'px-2.5 w-25 py-[5px] h-10 bg-white rounded-2xl'} targetUserId={user._id} />
        </div>
    )
}

export default OtherUsers
