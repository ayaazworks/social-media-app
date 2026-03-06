import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import axios from "axios"
import { serverURL } from '../App'
import { setNotificationData } from '../redux/userSlice';

const Notifications = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { notificationData } = useSelector(state => state.user)
    const ids = notificationData.map((n) => n._id)
    const markAsRead = async () => {
        try {
            const result = await axios.post(`${serverURL}/api/user/markasread`, { notificationId: ids },
                { withCredentials: true })
            await fetchNotifications()
        } catch (error) {
            console.log(error)
        }
    }
    const fetchNotifications = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/user/getallnotifications`, { withCredentials: true })
            dispatch(setNotificationData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        markAsRead()
    }, [])
    return (
        <div className='w-full h-[100vh] overflow-auto bg-black'>
            <div className='w-full h-[80px] flex items-center gap-5 px-[20px] lg:hidden'>
                <MdOutlineKeyboardBackspace className="text-white size-[25px] cursor-pointer" onClick={() => navigate(`/`)} />
                <h1 className='text-white text-5 font-semibold'>Notifications</h1>
            </div>

            <div className='w-full flex flex-col gap-[20px] h-[100vh] px-[10px]'>
                {notificationData?.map((noti, index) => (
                    <NotificationCard noti={noti} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Notifications