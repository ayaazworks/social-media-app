import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import nodp from "../assets/dpblank.png"
import { serverURL } from '../App'
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const EditProfile = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageInput = useRef()
    const [frontendImage, setFrontendImage] = useState(userData.profileImage || nodp)
    const [backendImage, setBackendImage] = useState(null)
    const [name, setName] = useState(userData.name || "")
    const [userName, setUserName] = useState(userData.userName || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [profession, setProfession] = useState(userData.profession || "")
    const [gender, setGender] = useState(userData.gender || "")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleImage = (e) => {
        try {
            const file = e.target.files[0]
            setBackendImage(file)
            setFrontendImage(URL.createObjectURL(file))
        } catch (error) {
            console.log(`EditProfile.jsx handleImage function error ${error}`)

        }

    }

    const handleEditProfile = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("userName", userName)
            formData.append("bio", bio)
            formData.append("profession", profession)
            formData.append("gender", gender)
            if (backendImage) {
                formData.append("profileImage", backendImage)
            }
            const result = await axios.post(`${serverURL}/api/user/editprofile`, formData, { withCredentials: true })
            dispatch(setProfileData(result.data))
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate(`/profile/${userData.userName}`)
        } catch (error) {
            console.log(`EditProfile.jsx handleEditProfile function error ${error}`)
            setLoading(false)
        }
    }
    return (
        <div className='w-full min-h-screen bg-black flex items-center flex-col gap-5 '>

            <div className='w-full h-[80px] flex items-center gap-5 px-5'>
                <MdOutlineKeyboardBackspace className="text-white size-[25px] cursor-pointer" onClick={() => navigate(`/profile/${userData.userName}`)} />
                <h1 className='text-white text-5 font-semibold'>Edit Profile</h1>
            </div>
            <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={(() => imageInput.current.click())}>
                <input type='file' accept='image/*' ref={imageInput} hidden onChange={handleImage} />
                <img src={frontendImage} alt='' className='w-full object-cover' />
            </div>
            <div onClick={(() => imageInput.current.click())} className='text-blue-500 text-center text-[18px] cursor-pointer'>Change Your Profile Picture</div>

            {/* Inputs.......................................... */}

            <input type='text' className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 text-white font-semibold border-gray-700 rounded-2xl px-5 outline-none ' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />

            <input type='text' className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 text-white font-semibold border-gray-700 rounded-2xl px-5 outline-none ' placeholder='Enter your username' onChange={(e) => setUserName(e.target.value)} value={userName} />

            <input type='text' className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 text-white font-semibold border-gray-700 rounded-2xl px-5 outline-none' placeholder='Bio' onChange={(e) => setBio(e.target.value)} value={bio} />

            <input type='text' className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 text-white font-semibold border-gray-700 rounded-2xl px-5 outline-none ' placeholder='Profession' onChange={(e) => setProfession(e.target.value)} value={profession} />


            <div className="w-[90%] max-w-[600px] relative">
                <select
                    className="w-full h-[60px] bg-[#0a1010] border-2 text-white font-semibold border-gray-700 rounded-2xl px-5 outline-none appearance-none cursor-pointer"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                >
                    <option value="" disabled hidden>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>

                {/* Custom Arrow Icon for better styling (optional but recommended) */}
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                </div>
            </div>

            <button className='px--5 w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white cursor-pointer rounded-2xl ' onClick={handleEditProfile}>{loading ? <ClipLoader size={30} color='black' /> : "Save Profile"} </button>

        </div>
    )
}

export default EditProfile
