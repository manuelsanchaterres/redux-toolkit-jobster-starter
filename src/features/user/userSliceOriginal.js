import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { addUserFromLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
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
    
    try {

        const response = await customFetch.post('/auth/register', user)
        return response.data

    } catch (error) {

        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

})

export const loginUser = createAsyncThunk('user/loginUser', 

    async (user, thunkAPI) => {

    try {

        const response = await customFetch.post('/auth/login', user)

        return response.data
        
    } catch (error) {
        
        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }
    

})

export const updateUser = createAsyncThunk('user/updateUser', 

    async (user, thunkAPI) => {

    // const localUser = JSON.parse(localStorage.getItem('user'))

    // const {token} = localUser
    
    try {


        // const response = await customFetch.patch('/auth/updateUser', user, {headers: {Authorization: `Bearer ${token}`}})
        const response = await customFetch.patch('/auth/updateUser', user, {headers: {Authorization: `Bearer ${thunkAPI.getState().user.user.token} `}})

        return response.data
        
    } catch (error) {
        
        // console.log(error.response.data.msg);

        if (error.response.status === 401) {

            thunkAPI.dispatch(logoutUser());

            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
 
        }

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

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
        .addCase(registerUser.fulfilled, (state, payload) =>  {

            const {user} = payload

            addUserFromLocalStorage(user)

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


            addUserFromLocalStorage(user)
            
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

            addUserFromLocalStorage(user)
            
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