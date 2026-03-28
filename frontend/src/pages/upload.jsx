import React, { useRef, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
import VideoPlayer from '../components/VideoPlayer';
import axios from "axios"
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setpostData } from '../redux/postSlice';
import { setCurrentUserStory } from '../redux/storySlice';
import { setLoopData } from '../redux/loopSlice';


const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const mediaInput = useRef()
    const [mediaType, setMediaType] = useState("")
    const [caption, setCaption] = useState("")
    const dispatch = useDispatch()
    const { postData } = useSelector(state => state.post)
    const { storyData } = useSelector(state => state.story)
    const { loopData } = useSelector(state => state.loop)
    const [loading, setLoading] = useState(false)

    const handleMedia = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file.type.includes("image")) {
            setMediaType("image")
        } else {
            setMediaType("video")
        }

        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverURL}/api/post/upload`, formData, { withCredentials: true })
            dispatch(setpostData([...postData, result.data]))
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    const uploadStory = async () => {
        try {
            const formData = new FormData()
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverURL}/api/story/upload`, formData, { withCredentials: true })
            dispatch(setCurrentUserStory(result.data))
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    const uploadLoop = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverURL}/api/loop/upload`, formData, { withCredentials: true })
            dispatch(setLoopData([...loopData, result.data]))
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    const handleUpload = () => {
        setLoading(true)
        if (uploadType == "post") {
            uploadPost()
        } else if (uploadType == "story") {
            uploadStory()
        } else {
            uploadLoop()
        }
    }
    return (
        <div className='w-full h-screen bg-black flex flex-col items-center'>
            <div className='w-full h-[80px] flex items-center gap-5 px-5'>
                <MdOutlineKeyboardBackspace className="text-white size-[25px] cursor-pointer" onClick={() => navigate("/")} />
                <h1 className='text-white text-5 font-semibold'>Upload Media</h1>
            </div>
            <div className='w-[90%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]' >


                <div className={`${uploadType == "post" ? "text-white bg-black shadow-2xl shadow-black w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer " : " "}w-[28%] h-[80%] flex justify-center
                items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer`} onClick={() => setUploadType("post")}>Post</div>

                <div className={`${uploadType == "story" ? "text-white bg-black shadow-2xl shadow-black w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer " : " "}w-[28%] h-[80%] flex justify-center
                items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer`} onClick={() => setUploadType("story")}>Story</div>

                <div className={`${uploadType == "loop" ? "text-white bg-black shadow-2xl shadow-black w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer " : " "}w-[28%] h-[80%] flex justify-center
                items-center text-[19px] font-semibold rounded-full hover:shadow-2xl hover:shadow-black hover:bg-black hover:text-white cursor-pointer`} onClick={() => setUploadType("loop")}>Loop</div>
            </div>

            {!frontendMedia && <div className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d] ' onClick={() => mediaInput.current.click()}>

                <input type='file' accept={uploadType =="loop"?"video/*":""} hidden ref={mediaInput} onChange={handleMedia} />

                <FiPlusSquare className='text-white w-[25px] h-[25px] cursor-pointer' />
                <div className='text-white text-[19px] font-semibold '>Upload {uploadType}</div>
            </div>}


            {frontendMedia &&
                <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]'>
                    {mediaType == "image" &&
                        <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]'>
                            <img className='h-[60%] rounded-2xl' src={frontendMedia} alt='' />
                            {uploadType != "story" &&
                                <input type='text' className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e) => setCaption(e.target.value)} value={caption} />
                            }
                        </div>}

                    {mediaType == "video" &&
                        <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]'>
                            <VideoPlayer media={frontendMedia} />
                            {uploadType != "story" &&
                                <input type='text' className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e) => setCaption(e.target.value)} value={caption} />
                            }
                        </div>}
                </div>
            }

            {frontendMedia &&
                <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white mt-[50px] cursor-pointer rounded-2xl' onClick={handleUpload}>{loading ? <ClipLoader size={30} color='black' /> : `Upload ${uploadType}`}</button>
            }

        </div>
    )
}

export default Upload
