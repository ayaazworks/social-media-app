import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setpostData } from '../redux/postSlice'
import { setLoopData } from '../redux/loopSlice'

const getAllLoops = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchLoops = async () =>{
            try {
                const result = await axios.get(`${serverURL}/api/loop/getall`,{withCredentials:true})
                dispatch(setLoopData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchLoops()
    },[dispatch,userData])
}

export default getAllLoops
