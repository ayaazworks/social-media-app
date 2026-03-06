import React, { useEffect, useState } from 'react'
import nodp from "../assets/dpblank.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import VideoPlayer from './VideoPlayer';
import { FaEye } from "react-icons/fa6"

const StoryCard = ({ storyData }) => {
  const { userData } = useSelector(state => state.user)
  const [showViewers, setShowViewers] = useState(false)
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 150)

    return () => clearInterval(interval)
  }, [navigate])
  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>

      <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>

        <MdOutlineKeyboardBackspace className="text-white size-[25px] cursor-pointer" onClick={() => navigate(`/`)} />
        <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img src={storyData?.author?.profileImage || nodp}
            alt=''
            className='w-full object-cover'
          />
        </div>
        <div className='w-[120px] truncate text-white font-semibold'>{storyData?.author?.userName}</div>
      </div>

      <div className='absolute top-[10px] w-full h-[5px] bg-gray-900'>
        <div className='h-full w-[200px] bg-white transition-all duration-200 ease-linear' style={{ width: `${progress}%` }}>
        </div>
      </div>

      {!showViewers && <><div className='w-full h-[90vh] flex items-center justify-center'>
        {storyData?.mediaType === "image" && <div className='w-[90%] flex items-center justify-center'>
          <img className='w-[80%] rounded-2xl object-cover' src={storyData?.media} alt='' />
        </div>
        }
        {storyData?.mediaType === "video" && <div className='w-[80%] flex flex-col items-center justify-center '>
          <VideoPlayer media={storyData?.media} />
        </div>
        }
      </div>


        {storyData?.author?.userName == userData?.userName && <div className='absolute w-full flex items-center cursor-pointer gap-[10px] h-[70px] text-white bottom-0 p-2 left-0' onClick={() => setShowViewers(true)}>
          <div className='text-white flex items-center gap-[5px]'><FaEye />{storyData?.viewers.length}</div>

          <div className='flex relative'>
            {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
              <div key={index} className={`w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? "absolute" : ""}`}
                style={{ left: index > 0 ? `${index * 9}px` : '0px' }}>
                <img src={viewer?.profileImage || nodp} alt='' className='w-full object-cover' />
              </div>
            ))}

          </div>
        </div>}</>}

      {showViewers &&
        <>
          <div className='w-full h-[30vh] flex items-center justify-center mt-[100px] cursor-pointer overflow-hidden py-[10px]' onClick={()=>setShowViewers(false)}>
            {storyData?.mediaType === "image" && <div className='h-full flex items-center justify-center'>
              <img className='h-[80%] rounded-2xl object-cover' src={storyData?.media} alt='' />
            </div>
            }
            {storyData?.mediaType === "video" && <div className='h-full flex flex-col items-center justify-center '>
              <VideoPlayer media={storyData?.media} />
            </div>
            }
          </div>
          <div className='w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]'>
            <div className='text-white flex items-center gap-[10px]'><FaEye /><span>{storyData?.viewers?.length}</span><span>Viewers</span></div>
            <div className='w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]'>
        {storyData?.viewers?.map((viewer, index) => (
          <div className='w-full flex items-center gap-[20px]'>
            <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' index={index}>
              <img src={viewer?.profileImage || nodp}
                alt=''
                className='w-full object-cover'
              />
              
            </div>
            <div className='w-[120px] font-semibold truncate text-white'>{viewer?.userName}</div>
          </div>
        ))}

      </div>
          </div>
        </>}

      



    </div>
  )
}

export default StoryCard
