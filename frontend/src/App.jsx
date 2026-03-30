import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import usegetCurrentUser from './hooks/usegetCurrentUser'
import  usegetSuggestedUsers  from '../hooks/usegetSuggestedUsers'
import  usegetAllPost  from '../hooks/usegetAllPost'
import  usegetAllLoops  from '../hooks/usegetAllLoops'
import  usegetAllStories  from '../hooks/usegetAllStories'
import  usegetFollowingList  from '../hooks/usegetFollowingList'
import  usegetPrevChatUsers  from '../hooks/usegetPrevChatUsers'
import usegetAllNotifications from '../hooks/usegetAllNotifications'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/upload'
import Loops from './pages/Loops'
import Story from './pages/Story'
import Messages from './pages/Messages'
import MessagesArea from './pages/MessagesArea'
import { io } from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import Search from './pages/Search'
import Notifications from './pages/Notifications'
import { setNotificationData, addSingleNotification } from './redux/userSlice'
export const serverURL = "https://social-media-app-production-7be3.up.railway.app"


const App = () => {
  const dispatch = useDispatch();
  usegetCurrentUser();
  const { userData, isLoading, notificationData } = useSelector(state => state.user);
  const { socket } = useSelector(state => state.socket);
  usegetSuggestedUsers();
  usegetAllPost();
  usegetAllLoops();
  usegetAllStories();
  usegetFollowingList();
  usegetPrevChatUsers();
  usegetAllNotifications();

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-[#0e1718]'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />

      {/* Grouping protected routes */}

      <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
      <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signin"} />} />
      <Route path='/messages' element={userData ? <Messages /> : <Navigate to={"/signin"} />} />
      <Route path='/messagesarea' element={userData ? <MessagesArea /> : <Navigate to={"/signin"} />} />
      <Route path='/upload' element={userData ? <Upload /> : <Navigate to={"/signin"} />} />
      <Route path='/loops' element={userData ? <Loops /> : <Navigate to={"/signin"} />} />
      <Route path='/notifications' element={userData ? <Notifications /> : <Navigate to={"/signin"} />} />
      <Route path='/story/:userName' element={userData ? <Story /> : <Navigate to={"/signin"} />} />
      <Route path='/search' element={userData ? <Search /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App
