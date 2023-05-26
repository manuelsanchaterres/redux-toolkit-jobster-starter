import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";
import { addJobtoLocalStorage } from "../../utils/localStorage/jobLocalStorage";
import { getUserFromLocalStorage } from "../../utils/localStorage/userLocalStorage";
import { redirectUser } from "../../utils/functions";


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
    allJobsArray: []

}

export const createJob = createAsyncThunk('job/createJob',

    (job, thunkAPI) => {
    return createJobThunk('/jobs', job, thunkAPI)

})

export const deleteJob = createAsyncThunk('job/deleteJob',

    (jobId, thunkAPI) => {

    return deleteJobThunk(`/jobs/${jobId}`, thunkAPI)

})

export const editJob = createAsyncThunk('job/editJob',

    (jobInfo, thunkAPI) => {
        
        const {jobId,jobEdited} = jobInfo

    return editJobThunk(`/jobs/${jobId}`,jobEdited, thunkAPI)

})



const jobSlice = createSlice({

    name: 'job',
    initialState,

    reducers : {

        handleChange: (state, {payload: {name, value}}) => {

            return {...state, [name]: value}

        },

        clearValues: (state) => {

            if (state.isEditing) {

                return {...initialState, jobLocation: getUserFromLocalStorage()?.location, isEditing:true }    

            }

            return {...initialState, jobLocation: getUserFromLocalStorage()?.location }    

        },

        setEditJob: (state, {payload}) => {

            return {...state, isEditing: !state.isEditing, ...payload}

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
        .addCase(editJob.pending, (state) =>  {

            return {...state, isLoading: true}

        })
        .addCase(editJob.fulfilled, (state, {payload}) =>  {

            const {allJobsArray} = state 
            const {updatedJob} = payload


            toast.success(`Job ${updatedJob.position} Successfully Edited`)

            const newAllJobsArray = [...allJobsArray, updatedJob]

            
            addJobtoLocalStorage(newAllJobsArray)

            setTimeout(()=> {

                redirectUser('/all-jobs')

            }, 6500)
            return {...state, isLoading: false, allJobsArray: newAllJobsArray }


        })
        .addCase(editJob.rejected, (state, {payload}) =>  {

            toast.error(payload)

            return {...state, isLoading: false}


        })


    }


})

export const {handleChange, clearValues, setEditJob} = jobSlice.actions
export default jobSlice.reducer;