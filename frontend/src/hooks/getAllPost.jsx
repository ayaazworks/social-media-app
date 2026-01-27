import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setpostData } from '../redux/postSlice'

const getAllPost = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchPost = async () =>{
            try {
                const result = await axios.get(`${serverURL}/api/post/getallpost`,{withCredentials:true})
                dispatch(setpostData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    },[dispatch,userData])
}

export default getAllPost
