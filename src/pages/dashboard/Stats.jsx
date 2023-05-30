import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getJobsStats } from "../../features/allJobs/AllJobsSlice"
import {setEditJob} from '../../features/job/jobSlice'
import {ChartsContainer, Loading, StatsContainer} from '../../components'

const Stats = () => {

  const dispatch = useDispatch()
  const {isLoading, monthlyApplications} = useSelector((store) => store.allJobs)

  // useEffect to restore jobSlice isEditing value to false every time the page mounts
  useEffect(() =>{
    

    dispatch(getJobsStats())
    dispatch(setEditJob({isEditing: false}))

  },[])

  if (isLoading) {

    return (

      <Loading center/>

    )
  }


  return (
    <>

      <StatsContainer />
      {monthlyApplications?.length > 0 && <ChartsContainer />}
    
    </>
  )
}
export default Stats