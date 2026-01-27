import React, { useRef } from 'react'
import logow from "../assets/logo2.png"
import { FaRegHeart } from "react-icons/fa6"
import StoryDp from './StoryDp'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Post from './Post '

const Feed = () => {
  const {postData} =useSelector(state=>state.post)
  const navigate=useNavigate()
  const storyRef = useRef(null)
  const handleWheel = (e) => {
    if (storyRef.current) {
      e.preventDefault()
      storyRef.current.scrollLeft += e.deltaY
    }
  }
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh]] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden '>
        <img className='w-20' src={logow} alt='' />
        <div>
          <FaRegHeart className='text-white w-[25px] h-6.25' />
        </div>
      </div>
      <div ref={storyRef} onWheel={handleWheel} className='flex w-full overflow-auto gap-2.5 items-center p-5 hide-scrollbar'>

        <StoryDp userName={"ayaaz4141sdfsdfds"} />
        <StoryDp userName={"ayaaz4141sdffds"} />
        <StoryDp userName={"ayaaz1441"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
        <StoryDp userName={"ayaaz"} />
      </div>
      <div className='w-full min-h-[100vh] flex flex-col items-center gap-5 p-2.5 pt-10 bg-white rounded-t-[60px] relative pb-30'>
        <Nav/>

      {postData?.map((post,index)=>(
        <Post post={post} key={index} />
      ))}

      </div>
    </div >
  )
}

export default Feed
