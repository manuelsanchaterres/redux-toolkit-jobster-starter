import {checkForUnauthorizedResponse, customFetch, customFetchLoginRegisterUser} from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/AllJobsSlice';
// import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';


export const registerUserThunk = async (url,user, thunkAPI) => {

    try {

        const response = await customFetchLoginRegisterUser.post(url, user)

        return response.data

    } catch (error) {

        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const loginUserThunk = async (url,user, thunkAPI) => {

    try {

        const response = await customFetchLoginRegisterUser.post(url, user)

        return response.data
        
    } catch (error) {
        
        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const updateUserThunk = async (url,user, thunkAPI) => {

    try {


        const response = await customFetch.patch(url, user)

        return response.data
        
    } catch (error) {
        
        checkForUnauthorizedResponse(error, thunkAPI)

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const clearStoreThunk = async (message, thunkAPI) => {

    try {

        thunkAPI.dispatch(logoutUser(message))
        thunkAPI.dispatch(clearAllJobsState())
        thunkAPI.dispatch(clearValues())

        console.log({Promise});

        return Promise.resolve()
        
    } catch (error) {
            
        return Promise.reject()
        
    }
}