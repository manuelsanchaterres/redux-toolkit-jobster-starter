import { useEffect } from "react"
import { getJobs } from "../features/allJobs/AllJobsSlice"
import { useDispatch, useSelector } from "react-redux"
import { getJobsFromLocalStorage } from "../utils/localStorage/jobsLocalStorage"
import Job from "./Job"
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from "./Loading"

const JobsContainer = () => {

  const dispatch = useDispatch()

  useEffect(() =>{

    dispatch(getJobs())

  },[])


  const jobs = useSelector((store) => store.allJobs.jobs)
  const {isLoading, totalJobs} = useSelector((store) => store.allJobs)
  
  if (isLoading) {

    return (

      <Loading center />

    )
  }


  if (jobs.length === 0) {

    return (

      <Wrapper>

        <h2>No jobs to display...</h2>

      </Wrapper>
    )
  }




  return (

    <Wrapper>

      <h5>{`${jobs.length} jobs info`}</h5>
      <div className="jobs">

        {jobs.map((job) => {

          return <Job key={job._id} {...job} />


        })}
      </div>


    </Wrapper>
    
    )
}
export default JobsContainer