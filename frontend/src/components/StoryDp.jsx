import React, { useEffect, useState } from 'react'
import nodp from "../assets/dpblank.png"
import { FiPlusCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverURL } from '../App'

const StoryDp = ({ profileImage, userName, story }) => {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const { storyData, storyList } = useSelector(state => state.story)
    const [viewed, setViewed] = useState((false))

    useEffect(() => {
        if (story?.viewers && userData?._id) {

            const hasViewed = story.viewers.some((viewer) => {
                const viewerId = viewer?._id?.toString() || viewer?.toString();
                const currentUserId = userData._id.toString();

                return viewerId === currentUserId;
            });

            setViewed(hasViewed);
        } else {
            setViewed(false);
        }
    }, [story, userData]); 

    const handleViewers = async () => {
        if (!story?._id) return;
        try {
            const result = await axios.get(`${serverURL}/api/story/view/${story._id}`, { withCredentials: true })
        } catch (error) {
            console.log(`handleViewers function error ${error}`)
        }
    }

    const handleClick = () => {
        if (!story && userName == "Your Story") {
            navigate("/upload")
        } else if (story && userName == "Your Story") {
            navigate(`/story/${userData.userName}`)
            handleViewers()
        } else {
            handleViewers()
            navigate(`/story/${userName}`)
        }
    }
    return (
        <div className='flex flex-col w-[80px]'>

            <div className={`size-[80px] ${!story ? null : !viewed ? "bg-linear-to-b from-blue-500 to-blue-950" : "bg-linear-to-r from-gray-500 to-black"}  rounded-full flex justify-center items-center relative`} onClick={handleClick}>
                <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden" >

                    <img src={profileImage || nodp} alt='' className='w-full object-cover' />
                    {!story && userName == "Your Story" &&
                        <div>
                            <FiPlusCircle className='text-black absolute bottom-[8px] right-[10px] bg- rounded-full size-[22px]' />
                        </div>
                    }

                </div>
            </div>
            <div className='tex-[14px] text-center truncate w-full text-white'>{userName}</div>
        </div >
    )
}

export default StoryDp
