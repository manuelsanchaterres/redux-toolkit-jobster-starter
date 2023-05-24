import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createJobThunk, deleteJobThunk } from "./jobThunk";
import { addJobtoLocalStorage } from "../../utils/localStorage/jobLocalStorage";
import { getJobsFromLocalStorage } from "../../utils/localStorage/jobsLocalStorage";
import { getUserFromLocalStorage } from "../../utils/localStorage/userLocalStorage";

const initialState = {

    isLoading: false,
    position: "",
    company: "",
    jobLocation: "",
    // jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    // statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
    allJobsArray: getJobsFromLocalStorage()

}

export const createJob = createAsyncThunk('job/createJob',

    (job, thunkAPI) => {
    return createJobThunk('/jobs', job, thunkAPI)

})

export const deleteJob = createAsyncThunk('job/deleteJob',

    (jobId, thunkAPI) => {

    return deleteJobThunk(`/jobs/${jobId}`, thunkAPI)

})


const jobSlice = createSlice({

    name: 'job',
    initialState,

    reducers : {

        handleChange: (state, {payload: {name, value}}) => {

            return {...state, [name]: value}

        },

        clearValues: () => {

            return {...initialState, jobLocation: getUserFromLocalStorage()?.location }    

        }


    },

    extraReducers: (builder) => {

        builder
        .addCase(createJob.pending, (state) =>  {

            return {...state, isLoading: true}

        })
        .addCase(createJob.fulfilled, (state, {payload}) =>  {

            const {allJobsArray} = state
            const {job} = payload

            toast.success(`Job ${job.position} Successfully Added`)

            const newAllJobsArray = [...allJobsArray, job]

            addJobtoLocalStorage(newAllJobsArray)

            return {...state, isLoading: false, editJobId: job._id, allJobsArray: newAllJobsArray }


        })
        .addCase(createJob.rejected, (state, {payload}) =>  {

            toast.error(payload)

            return {...state, isLoading: false}


        })
        .addCase(deleteJob.fulfilled, (state, {payload}) =>  {

            toast.success(payload)

        })
        .addCase(deleteJob.rejected, (state, {payload}) =>  {

            toast.error(payload)

        })


    }


})

export const {handleChange, clearValues} = jobSlice.actions
export default jobSlice.reducer;