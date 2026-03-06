import React, { useRef } from 'react'
import logow from "../assets/logo2.png"
import { FaRegHeart } from "react-icons/fa6"
import { BiMessageAltDetail } from "react-icons/bi";
import StoryDp from './StoryDp'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Post from './Post '

const Feed = () => {
  const { postData } = useSelector(state => state.post)
  const { userData, notificationData } = useSelector(state => state.user)
  const { storyList, currentUserStory } = useSelector(state => state.story)
  const navigate = useNavigate()
  const storyRef = useRef(null)
  const handleWheel = (e) => {
    if (storyRef.current) {
      e.preventDefault()
      storyRef.current.scrollLeft += e.deltaY
    }
  }
  console.log(currentUserStory)
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden '>
        <img className='w-20' src={logow} alt='' />
        <div className='flex items-center gap-[10px]'>
          <div className='relative' onClick={()=>navigate("/notifications")}>
            <FaRegHeart className='text-white w-[25px] h-6.25' />
            {(notificationData?.length > 0 && notificationData.some((noti) => noti.isRead === false)) && (<div className='w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]'></div>)}

          </div>
          <BiMessageAltDetail className='text-white w-[25px] h-6.25' onClick={() => navigate("/messages")} />
        </div>
      </div>
      <div ref={storyRef} onWheel={handleWheel} className='flex w-full overflow-x-auto gap-2.5 items-center p-5 hide-scrollbar'>

        <StoryDp userName={"Your Story"} profileImage={userData?.profileImage} story={currentUserStory} />

        {storyList?.map((story, index) => (
          <StoryDp userName={story?.author?.userName} profileImage={story?.author?.profileImage} story={story} key={index} />
        ))}

      </div>
      <div className='w-full min-h-[100vh] flex flex-col items-center gap-5 p-2.5 pt-10 bg-white rounded-t-[60px] relative pb-30'>
        <Nav />

        {postData?.map((post, index) => (
          <Post post={post} key={index} />
        ))}

      </div>
    </div >
  )
}

export default Feed
