import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setpostData } from '../redux/postSlice'
import { setNotificationData } from '../redux/userSlice'

const usegetAllNotifications = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    useEffect(()=>{
    const fetchNotifications = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/user/getallnotifications`, { withCredentials: true })
            dispatch(setNotificationData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    fetchNotifications()
},[dispatch,userData])
}

export default usegetAllNotifications
