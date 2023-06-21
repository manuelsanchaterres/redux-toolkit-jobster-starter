import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage/userLocalStorage";
import { clearStore } from '../features/user/userSlice';

export const customFetch = axios.create({

    // baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
    baseURL: import.meta.env.VITE_JOBSTER_API_ENDPOINT

})

export const customFetchLoginRegisterUser = axios.create({

    // baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
    baseURL: import.meta.env.VITE_JOBSTER_API_ENDPOINT

})


customFetch.interceptors.request.use(
    
    (config) => {

        const user = getUserFromLocalStorage()

        if ( user) {

            config.headers['Authorization'] = `Bearer ${user.token} `;
            
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
        
    }
    
)

export const checkForUnauthorizedResponse = (error, thunkAPI) => {

    if (error.response.status === 401) {

        thunkAPI.dispatch(clearStore());

        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')

    }

}