import {checkForUnauthorizedResponse, customFetch} from '../../utils/axios';
import { logoutUser} from '../user/userSlice';

export const getJobsThunk = async (url, thunkAPI) => {

    // console.log(url);
    try {

        const response = await customFetch.get(url)

        // console.log(response.data);
        return response.data

    } catch (error) {


        checkForUnauthorizedResponse(error, thunkAPI)

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}

export const getJobsStatsThunk = async (url, thunkAPI) => {

    try {

        const response = await customFetch.get(url)

        return response.data

    } catch (error) {


        if (error.response.status === 401) {

            thunkAPI.dispatch(logoutUser());

            return thunkAPI.rejectWithValue('Unauthorized User! Logging Out...')

        }

        return thunkAPI.rejectWithValue(error.response.data.msg)

    }

}


