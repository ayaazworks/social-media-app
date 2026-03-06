import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        postData:null,
    },
    reducers:{
        setpostData:(state,action) =>{
            state.postData=action.payload
        }
    }
})

export const {setpostData} = postSlice.actions
export default postSlice.reducer
