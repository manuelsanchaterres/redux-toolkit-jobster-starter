import { useEffect } from "react"
import { setEditJob } from "../../features/job/jobSlice"
import { useDispatch} from "react-redux"


const Stats = () => {

  const dispatch = useDispatch()

  // useEffect to restore jobSlice isEditing value to false every time the page mounts
  
  useEffect(() =>{

    dispatch(setEditJob({isEditing: false}))

  },[])


  return (
    <div>Stats</div>
  )
}
export default Stats