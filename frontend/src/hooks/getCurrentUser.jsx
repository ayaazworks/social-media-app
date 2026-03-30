import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData, setIsLoading } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

const getCurrentUser = () => {
    const dispatch = useDispatch()
    const {storyData} = useSelector(state=>state.story)
    useEffect(()=>{
        const fetchUser = async () =>{
            try {
                const result = await axios.get(`${serverURL}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
                dispatch(setCurrentUserStory(result.data.story))
                dispatch(setIsLoading(false))
            } catch (error) {
                dispatch(setIsLoading(false))
                console.log(error)
            } finally {
                dispatch(setIsLoading(false)) // Fixed syntax error here
            }
        }
        fetchUser()
    },[storyData])
}

export default getCurrentUser
