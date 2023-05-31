import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getJobsThunk, getJobsStatsThunk } from './AllJobsThunk';
import { addJobstoLocalStorage, getJobsFromLocalStorage } from '../../utils/localStorage/jobsLocalStorage';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  // sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  filteredJobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// export const getJobs = createAsyncThunk('allJobs/getJobs',

//     (_,thunkAPI) => {
//     return getJobsThunk('/jobs',thunkAPI)

// })

export const getJobs = createAsyncThunk('allJobs/getJobs',

    (_,thunkAPI) => {

      const {page, search, searchStatus, searchType, sort} = thunkAPI.getState().allJobs

      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

      if (search) {

        url = url + `&search=${search}`

      }

      return getJobsThunk(url,thunkAPI)
})



export const getJobsStats = createAsyncThunk('allJobs/getJobsStats',

    (_,thunkAPI) => {
    return getJobsStatsThunk('/jobs/stats',thunkAPI)

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
          ... initialState
        }    

      },

      showLoading: (state) => {

        return {...state, isLoading: true}

      },

      hideLoading: (state) => {

        return {...state, isLoading: false}

      },
      handleJobFilterSort: (state) => {

        const {search, searchStatus, searchType, sort, jobs} = state

        let filteredJobs = [...jobs]
        
        // if (search) {

        //   filteredJobs = filteredJobs.filter((job) => {

        //     return  job.position.toLowerCase().includes(search)
  
        //   })


        // }

        // if (searchStatus !== 'all') {

        //   filteredJobs = filteredJobs.filter((job) => {

        //     return  job.status.toLowerCase().includes(searchStatus)
  
        //   })
          
        // }

        // if (searchType !== 'all') {

        //   filteredJobs = filteredJobs.filter((job) => {

        //     return  job.jobType.toLowerCase().includes(searchType)
  
        //   })
          
        // }

        if (sort) {

          const {filteredJobs} = state

          let sortedJobs = [...filteredJobs]

          if (sort === 'latest') {

            sortedJobs = sortedJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          }

  
          return {...state, filteredJobs: sortedJobs}

        }

        console.log(filteredJobs);
        return {...state, filteredJobs }


      },

      changePage: (state, {payload}) => {

        return {...state, page: payload}
      }



    },

    extraReducers: (builder) => {

      builder
      .addCase(getJobs.pending, (state) =>  {

          return {...state, isLoading: true}

      })
      .addCase(getJobs.fulfilled, (state, {payload}) =>  {

        const {jobs, totalJobs, numOfPages} = payload
          
        addJobstoLocalStorage(jobs)
        return {...state, jobs, filteredJobs: jobs, totalJobs, numOfPages, isLoading: false}

      })
      .addCase(getJobs.rejected, (state, {payload}) =>  {

        toast.error(payload)

        return {...state, jobs: getJobsFromLocalStorage(), isLoading: false}


      })
      .addCase(getJobsStats.pending, (state) =>  {

        return {...state, isLoading: true}

      })
      .addCase(getJobsStats.fulfilled, (state, {payload}) =>  {

        const {defaultStats, monthlyApplications} = payload
          
        return {...state, stats : defaultStats, monthlyApplications, isLoading: false}


      })
      .addCase(getJobsStats.rejected, (state, {payload}) =>  {

        toast.error(payload)

        return {...state, isLoading: false}


      })


    }

})

export const {handleChange, clearValues, showLoading, hideLoading, handleJobFilterSort, changePage} = AllJobsSlice.actions
export default AllJobsSlice.reducer;
