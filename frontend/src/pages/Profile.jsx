import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverURL } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import nodp from "../assets/dpblank.png"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import Post from '../components/Post '
import { setselectedUser } from '../redux/messageSlice'

const Profile = () => {
  const { userName } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [postType, setPostType] = useState("posts")
  const { profileData, userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)

  const handleProfile = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/user/getprofile/${userName}`, { withCredentials: true })
      dispatch(setProfileData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/auth/signout`, { withCredentials: true })
      dispatch(setUserData(null))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleProfile()
  }, [userName, dispatch])

  if (!profileData) {
    return <div className='w-full h-screen flex justify-center items-center bg-[#0e1718]'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
  }

  // Helper check to safely compare IDs
  const isOwnProfile = profileData?._id === userData?._id;

  return (
    <div className='w-full min-h-screen bg-black'>

      {/* HEADER */}
      <div className='w-full h-20 flex justify-between items-center px-7.5 text-white'>
        <div onClick={() => navigate("/")}><MdOutlineKeyboardBackspace className="size-[25px] cursor-pointer" />
        </div>
        <div className='font-semibold text-[20px]'>{profileData?.userName}</div>
        <div className="font-semibold text-[20px] text-blue-500 cursor-pointer" onClickCapture={handleLogOut}>Log Out</div>
      </div>

      {/* BIO */}
      <div className='w-full h-[150px] flex items-start gap-5 lg:gap-[50px] pt-5 px-2.5 justify-center'>
        <div className='w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img src={profileData?.profileImage || nodp} alt='' className='w-full object-cover' />
        </div>
        <div >
          <div className='font-semibold text-[22px] text-white'>{profileData?.name}</div>
          <div className='text-[17px] text-[#ffffffe8]'>{profileData?.profession || "New User"}</div>
          <div className='text-[17px] text-[#ffffffe8]'>{profileData?.bio}</div>
        </div>
      </div>

      {/* STATS (Posts/Followers/Following) */}
      <div className='w-full h-20 flex items-center justify-center gap-10 md:gap-15 px-5 pt-7.5 text-white'>
        {/* POSTS COUNT */}
        <div>
          <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.posts.length}</div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffe8]'>Posts</div>
        </div>

        {/* FOLLOWERS */}
        <div>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex relative'>
              {profileData?.followers?.slice(0, 3).map((user, index) => (
                <div key={index} className={`w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? "absolute" : ""}`}
                  style={{ left: index > 0 ? `${index * 9}px` : '0px' }}>
                  <img src={user.profileImage || nodp} alt='' className='w-full object-cover' />
                </div>
              ))}
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'>
              {profileData?.followers.length}
            </div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffe8]'>Followers</div>
        </div>

        {/* FOLLOWING */}
        <div>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex relative'>
              {profileData?.following?.slice(0, 3).map((user, index) => (
                <div key={index} className={`w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? "absolute" : ""}`}
                  style={{ left: index > 0 ? `${index * 9}px` : '0px' }}>
                  <img src={user.profileImage || nodp} alt='' className='w-full object-cover' />
                </div>
              ))}

            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'>
              {profileData?.following.length}
            </div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffe8]'>Following</div>
        </div>
      </div>

      {/* BUTTONS (Edit or Follow) */}
      <div className='w-full h-20 flex justify-center items-center gap-5 mt-2.5  '>
        {isOwnProfile &&
          <button onClick={() => navigate("/editprofile")} className='px-2.5 min-w-37.5 py-[5px] h-10 bg-white cursor-pointer rounded-2xl
         '>Edit Profile</button>}

        {!isOwnProfile &&
          <>
            <FollowButton tailwind={`px-2.5 min-w-37.5 py-[5px] h-10 bg-white cursor-pointer rounded-2xl
         `} targetUserId={profileData?._id} onFollowChange={handleProfile} />
            <button className='px-2.5 min-w-[150px] py-[5px] h-10 bg-white cursor-pointer rounded-2xl
         ' onClick={() => {
                dispatch(setselectedUser(profileData)), navigate("/messagesarea")
              }}>Message</button>
          </>
        }
      </div>

      <div className='w-full min-h-screen flex justify-center'>
        <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-5 pt-[30px] pb-[100px]'>

          {/* Only show the Posts/Saved Toggle if it is YOUR profile */}
          {isOwnProfile && <div className='w-[90%] max-w-[500px] h-[80px] bg-white rounded-full flex justify-center items-center gap-[10px]' >

            <div className={`${postType == "posts" ? "text-white bg-black shadow-2xl shadow-black w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer " : " "}w-[28%] h-[80%] flex justify-center
                items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer`} onClick={() => setPostType("posts")}>Posts</div>

            <div className={`${postType == "saved" ? "text-white bg-black shadow-2xl shadow-black w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer " : " "}w-[28%] h-[80%] flex justify-center
                items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer`} onClick={() => setPostType("saved")}>Saved</div>
          </div>}

          <Nav />


          {/* Logic for OWN Profile */}
          {isOwnProfile && <>
            {postType == "posts" && postData?.map((post, index) => (
              post.author?._id == profileData?._id && <Post key={index} post={post} />
            ))}
            {postType === "saved" && postData?.map((post, index) => {
  const isThisPostSaved = userData?.saved?.some(item => 
    (item._id || item).toString() === post._id.toString()
  );
  
  return isThisPostSaved ? <Post key={post._id} post={post} /> : null;
})}
          </>
          }

          {/* Logic for OTHER Profile */}
          {!isOwnProfile && postData?.map((post, index) => (
            post.author?._id == profileData?._id && <Post key={index} post={post} />
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
