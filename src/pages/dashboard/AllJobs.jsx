import { useEffect } from 'react';
import { JobsContainer, SearchContainer } from '../../components';
import { setEditJob } from "../../features/job/jobSlice"
import { useDispatch, useSelector} from "react-redux"

const AllJobs = () => {

  const dispatch = useDispatch()
  // useEffect to restore jobSlice isEditing value to false every time the page mounts
  
  useEffect(() =>{

    dispatch(setEditJob({isEditing: false}))

  },[])

  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
