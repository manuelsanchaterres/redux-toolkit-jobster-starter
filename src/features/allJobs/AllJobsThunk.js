import customFetch from '../../utils/axios';
import { logoutUser} from '../user/userSlice';

export const getJobsThunk = async (url, thunkAPI) => {

    try {

        const response = await customFetch.get(url,{
            
            headers: {

            Authorization: `Bearer ${thunkAPI.getState().user.user.token}` 

        }})

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