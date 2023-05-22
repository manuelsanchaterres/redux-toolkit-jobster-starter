// REFACTORED SLICE

import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { addUsertoLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";
// import cartItems from '../../cartItems'

// - Root URL

const url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit'

const initialState = {

    isLoading: false,
    user: getUserFromLocalStorage(),
    isSidebarOpen: false,
}

export const registerUser = createAsyncThunk('user/registerUser', 

    async (user, thunkAPI) => {
    
    return registerUserThunk('auth/register', user, thunkAPI)

})

export const loginUser = createAsyncThunk('user/loginUser', 

    async (user, thunkAPI) => {

    return loginUserThunk('/auth/login', user, thunkAPI)

})

export const updateUser = createAsyncThunk('user/updateUser', 

    async (user, thunkAPI) => {

    // const localUser = JSON.parse(localStorage.getItem('user'))

    // const {token} = localUser
    
    return updateUserThunk('/auth/updateUser', user, thunkAPI)

})



const userSlice = createSlice({

    name: 'user',
    initialState,

    reducers: {

        toggleSidebar: (state) => {

            return {...state, isSidebarOpen: !state.isSidebarOpen}

        },
        logoutUser: (state) => {

            removeUserFromLocalStorage()

            return {...state, user: null, isLoading: false}

        },

    },
    extraReducers: (builder) => {

        builder
        .addCase(registerUser.pending, (state) =>  {

            return {...state, isLoading: true}

        })
        .addCase(registerUser.fulfilled, (state, {payload}) =>  {

            const {user} = payload

            addUsertoLocalStorage(user)

            toast.success(`Hello There ${user.name}`)


            return {...state, isLoading: false, user: user}


        })
        .addCase(registerUser.rejected, (state, {payload}) =>  {

            toast.error(payload)

            return {...state, isLoading: false}


        })
        .addCase(loginUser.pending, (state) =>  {

            return {...state, isLoading: true}


        })
        .addCase(loginUser.fulfilled, (state, {payload}) =>  {

            
            const {user} = payload


            addUsertoLocalStorage(user)
            
            toast.success(`Wellcome back ${user.name}`)

            return {...state, isLoading: false, user: user}


        })
        .addCase(loginUser.rejected, (state, {payload}) =>  {

            toast.error(payload)

            return {...state, isLoading: false}


        })
        .addCase(updateUser.pending, (state) =>  {

            return {...state, isLoading: true}


        })
        .addCase(updateUser.fulfilled, (state, {payload}) =>  {

            
            const {user} = payload

            addUsertoLocalStorage(user)
            
            toast.success(`User Successfully Updated`)

            return {...state, isLoading: false, user: user}


        })
        .addCase(updateUser.rejected, (state, {payload}) =>  {

            toast.error(payload)

            return {...state, isLoading: false}


        })


    }


})

// console.log(userSlice);

export const {toggleSidebar, logoutUser} = userSlice.actions

export default userSlice.reducer;