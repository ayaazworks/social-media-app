import React from 'react'
import LeftHome from '../components/LeftHome'
import Feed from '../components/Feed'
import RightHome from '../components/RightHome'
import { useSelector } from 'react-redux'
import { usegetSuggestedUsers } from '../hooks/usegetSuggestedUsers'
import { usegetAllPost } from '../hooks/usegetAllPost'
import { usegetAllLoops } from '../hooks/usegetAllLoops'
import { usegetAllStories } from '../hooks/usegetAllStories'
import { usegetFollowingList } from '../hooks/usegetFollowingList'
import { usegetPrevChatUsers } from '../hooks/usegetPrevChatUsers'
import {usegetAllNotifications} from '../hooks/usegetAllNotifications'


const Home = () => {

  usegetSuggestedUsers();
  usegetAllPost();
  usegetAllLoops();
  usegetAllStories();
  usegetFollowingList();
  usegetPrevChatUsers();
  usegetAllNotifications();
  const { userData } = useSelector(state => state.user)

  // If userData isn't there yet, show a loading state instead of the components
  if (!userData) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-[#0e1718]'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className='w-full flex justify-center items-start'>
      <LeftHome />
      <Feed />
      <RightHome />     
    </div>
  )
}

export default Home
