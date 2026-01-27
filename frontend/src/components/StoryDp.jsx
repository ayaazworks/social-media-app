import React from 'react'
import nodp from "../assets/dpblank.png"

const StoryDp = ({ profileImage, userName }) => {
    return (
        <div className='flex flex-col w-20 '>
            <div className='size-[80px] bg-linear-to-b from-blue-500 to-blue-950 rounded-full flex justify-center items-center'>
                <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                    <img src={nodp} alt='' className='w-full object-cover' />
                </div>
            </div>
            <div className='tex-[14px] text-center truncate w-full text-white'>{userName}</div>
        </div>
    )
}

export default StoryDp
