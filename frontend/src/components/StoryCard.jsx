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
    // Reset progress if storyData changes
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 150) // Approx 15 seconds total duration

    return () => clearInterval(interval)
  }, [navigate, storyData]) // Added storyData to dependency to reset if story changes

  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center bg-black'>

      {/* Header Info */}
      <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px] z-50'>
        <MdOutlineKeyboardBackspace className="text-white size-[25px] cursor-pointer" onClick={() => navigate(`/`)} />
        <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img src={storyData?.author?.profileImage || nodp} alt='' className='w-full object-cover' />
        </div>
        <div className='w-[120px] truncate text-white font-semibold'>{storyData?.author?.userName}</div>
      </div>

      {/* Progress Bar Container */}
      <div className='absolute top-[10px] left-0 w-full h-[3px] bg-gray-900 z-50'>
        {/* FIXED: Removed w-[200px] so it fills parent width */}
        <div 
          className='h-full bg-white transition-all duration-150 ease-linear' 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {!showViewers && (
        <>
          <div className='w-full h-[90vh] flex items-center justify-center'>
            {storyData?.mediaType === "image" && (
              <div className='w-full flex items-center justify-center'>
                <img className='max-w-[95%] max-h-[80vh] rounded-2xl object-contain' src={storyData?.media} alt='' />
              </div>
            )}
            {storyData?.mediaType === "video" && (
              <div className='w-full flex flex-col items-center justify-center'>
                <VideoPlayer media={storyData?.media} />
              </div>
            )}
          </div>

          {/* Viewers Trigger (Only for Owner) */}
          {storyData?.author?._id === userData?._id && (
            <div className='absolute w-full flex items-center cursor-pointer gap-[10px] h-[70px] text-white bottom-0 p-5 left-0 bg-gradient-to-t from-black/80 to-transparent' onClick={() => setShowViewers(true)}>
              <div className='text-white flex items-center gap-[5px]'><FaEye />{storyData?.viewers?.length || 0}</div>
              <div className='flex relative ml-2'>
                {/* FIXED: Added guard for viewers map */}
                {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
                  <div key={viewer?._id || index} 
                    className={`w-[30px] h-[30px] border-2 border-black rounded-full overflow-hidden`}
                    style={{ 
                        marginLeft: index > 0 ? '-10px' : '0px',
                        zIndex: 3 - index 
                    }}>
                    <img src={viewer?.profileImage || nodp} alt='' className='w-full object-cover' />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {showViewers && (
        <div className='absolute inset-0 bg-black z-[60] flex flex-col'>
          <div className='w-full h-[30vh] flex items-center justify-center mt-10 cursor-pointer overflow-hidden' onClick={() => setShowViewers(false)}>
             {/* Preview in viewer mode */}
             <img className='h-[80%] rounded-xl opacity-50' src={storyData?.media} alt='' />
          </div>
          
          <div className='w-full flex-1 bg-[#121212] rounded-t-3xl p-[20px]'>
            <div className='text-white flex items-center gap-[10px] mb-4'>
                <FaEye /> 
                <span className='font-bold'>{storyData?.viewers?.length || 0} Viewers</span>
            </div>
            <div className='w-full flex flex-col gap-[15px] overflow-y-auto max-h-[50vh]'>
                {/* FIXED: Added key to top level div */}
                {storyData?.viewers?.map((viewer, index) => (
                  <div key={viewer?._id || index} className='w-full flex items-center gap-[15px]'>
                    <div className='w-[40px] h-[40px] border border-gray-700 rounded-full overflow-hidden'>
                      <img src={viewer?.profileImage || nodp} alt='' className='w-full object-cover' />
                    </div>
                    <div className='font-semibold text-white'>{viewer?.userName}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoryCard
