import customFetch from '../../utils/axios';

import { logoutUser } from './userSlice';


export const registerUserThunk = async (url,user, thunkAPI) => {

    try {

        const response = await customFetch.post(url, user)
        // console.log(response.data);
        return response.data

    } catch (error) {

        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const loginUserThunk = async (url,user, thunkAPI) => {

    try {

        const response = await customFetch.post(url, user)

        return response.data
        
    } catch (error) {
        
        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const updateUserThunk = async (url,user, thunkAPI) => {

    try {


        // const response = await customFetch.patch('/auth/updateUser', user, {headers: {Authorization: `Bearer ${token}`}})
        const response = await customFetch.patch(url, user, {headers: {Authorization: `Bearer ${thunkAPI.getState().user.user.token} `}})

        return response.data
        
    } catch (error) {
        
        // console.log(error.response.data.msg);

        if (error.response.status === 401) {

            thunkAPI.dispatch(logoutUser());

            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
 
        }

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}