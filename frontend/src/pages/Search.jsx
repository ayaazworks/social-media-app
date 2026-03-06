import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FiSearch } from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import { setSearchData } from '../redux/userSlice';

const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState("")

    // Connect to your userSlice to get the searchData
    const { searchData } = useSelector((state) => state.user);

    const handleSearch = async () => {
        if (!input.trim()) {
            dispatch(setSearchData([]));
            return;
        }

        try {
            const result = await axios.get(`${serverURL}/api/user/search`, {
                params: { keyword: input },
                withCredentials: true // CRITICAL: This allows the isAuth middleware to see your token
            });

            dispatch(setSearchData(result.data));
        } catch (error) {
            console.error("Search Error:", error.response?.data || error.message);
        }
    }

    // Debounce search to prevent excessive API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className='w-full min-h-screen bg-black flex flex-col items-center pt-[20px]'>
            {/* Header / Back */}
            <div className='w-full flex items-center gap-[20px] px-[20px] mb-4'>
                <MdOutlineKeyboardBackspace
                    className="text-white text-[25px] cursor-pointer"
                    onClick={() => navigate(-1)}
                />
            </div>

            {/* Search Input Box */}
            <div className='w-full flex justify-center mb-6'>
                <form className='w-[90%] max-w-[800px] h-[55px] rounded-full bg-[#0f1414] flex items-center px-[20px] border border-gray-800' onSubmit={(e) => e.preventDefault()}>
                    <FiSearch className='text-gray-400 text-xl' />
                    <input
                        type="text"
                        placeholder='Search Here...'
                        className='w-full h-full bg-transparent outline-none px-[15px] text-white text-[18px]'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </form>
            </div>

            {/* Results Mapping */}
            <div className='w-[90%] max-w-[800px] flex flex-col gap-4'>
                {input && searchData && searchData.length > 0 ? (
                    searchData.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => navigate(`/profile/${user.userName}`)}
                            className='w-full bg-white rounded-full p-2 flex items-center justify-between px-6 cursor-pointer hover:bg-gray-200 transition-colors'
                        >
                            <div className='flex items-center gap-4'>
                                <img
                                    src={user.profileImage}
                                    alt=""
                                    className='w-12 h-12 rounded-full border border-gray-300 object-cover'
                                />
                                <div className='flex flex-col'>
                                    <h2 className='text-black font-bold text-lg'>@{user.userName}</h2>
                                    <p className='text-gray-600 text-sm'>{user.fullName || user.name}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    input && <p className='text-gray-500 text-center'>No users found matching "{input}"</p>
                )}
            </div>
        </div>
    )
}

export default Search