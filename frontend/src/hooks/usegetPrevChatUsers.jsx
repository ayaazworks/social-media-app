import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'
import { setPrevChatUsers } from '../redux/messageSlice'

const usegetPrevChatUsers = () => {
    const dispatch = useDispatch()
    const {messages} = useSelector(state=>state.message)
    useEffect(()=>{
        const fetchUser = async () =>{
            try {
                const result = await axios.get(`${serverURL}/api/message/prevchats`,{withCredentials:true})
                dispatch(setPrevChatUsers(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[messages])
}

export default usegetPrevChatUsers
