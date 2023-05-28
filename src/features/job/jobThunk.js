import {customFetch} from '../../utils/axios';
// import { authHeader } from '../../utils/functions';
import { hideLoading, showLoading, getJobs } from '../allJobs/AllJobsSlice';
import { logoutUser} from '../user/userSlice';
import { clearValues } from './jobSlice';
import { useForm } from "react-hook-form";

export const createJobThunk = async (url,job, thunkAPI) => {

    try {

        const response = await customFetch.post(url, job)
        
        // thunkAPI.dispatch(clearValues())

        return response.data

    } catch (error) {

        if (error.response.status === 401) {

            thunkAPI.dispatch(logoutUser());

            return thunkAPI.rejectWithValue('Unauthorized User! Logging Out...')

        }

        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const deleteJobThunk = async (url,thunkAPI) => {

    thunkAPI.dispatch(showLoading())

    try {

        const response = await customFetch.delete(url);

        thunkAPI.dispatch(getJobs())

        return response.data.msg

    } catch (error) {

        thunkAPI.dispatch(hideLoading())

        if (error.response.status === 401) {

            thunkAPI.dispatch(logoutUser());

            return thunkAPI.rejectWithValue('Unauthorized User! Logging Out...')

        }

        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const editJobThunk = async (url,jobEdited, thunkAPI) => {
    
    try {

        const response = await customFetch.patch(url,jobEdited);

        // thunkAPI.dispatch(clearValues())

        return response.data

    } catch (error) {


        if (error.response.status === 401) {

            thunkAPI.dispatch(logoutUser());

            return thunkAPI.rejectWithValue('Unauthorized User! Logging Out...')

        }

        console.log(error.response.data.msg);

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}


