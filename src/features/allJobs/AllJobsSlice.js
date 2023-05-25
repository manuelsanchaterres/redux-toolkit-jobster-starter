import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getJobsThunk } from './AllJobsThunk';
import { addJobstoLocalStorage, getJobsFromLocalStorage } from '../../utils/localStorage/jobsLocalStorage';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getJobs = createAsyncThunk('allJobs/getJobs',

    (_,thunkAPI) => {
    return getJobsThunk('/job',thunkAPI)

})

const AllJobsSlice = createSlice({
  name: 'allJobs',
  initialState,

    reducers : {

      handleChange: (state, {payload: {name, value}}) => {

        return {...state, [name]: value}

      },

      clearValues: (state) => {

          return {
          ...state, 
          search: '',
          searchStatus: 'all',
          searchType: 'all',
          sort: 'latest',
        }    

      },

      showLoading: (state) => {

        return {...state, isLoading: true}

      },

      hideLoading: (state) => {

        return {...state, isLoading: false}

      },



    },

    extraReducers: (builder) => {

        builder
        .addCase(getJobs.pending, (state) =>  {

            return {...state, isLoading: true}

        })
        .addCase(getJobs.fulfilled, (state, {payload}) =>  {

          const {jobs, totalJobs, numOfPages} = payload
            
          addJobstoLocalStorage(jobs)

          return {...state, jobs, totalJobs, numOfPages, isLoading: false}


        })
        .addCase(getJobs.rejected, (state, {payload}) =>  {

          toast.error(payload)
          
          return {...state, jobs: getJobsFromLocalStorage(), isLoading: false}


        })

    }

})

export const {handleChange, clearValues, showLoading, hideLoading} = AllJobsSlice.actions
export default AllJobsSlice.reducer;
