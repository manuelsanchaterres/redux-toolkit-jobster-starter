import { useEffect, useState } from 'react';
import { FormRow, JobInfo} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { formRowsAddJobPage } from '../../utils/constants';
import { checkEmpty } from '../../utils/functions';
import { createJob, handleChange, clearValues, editJob} from '../../features/job/jobSlice';

const AddJob = () => {

  const userLocation = useSelector((store) => store.user.user.location)
  const {isLoading, position, company, jobLocation, jobType, status, isEditing, editJobId, allJobsArray} = useSelector((store) => store.job)
  const {jobs} = useSelector((store) => store.allJobs)
  const job = useSelector((store) => store.job)

  const dispatch = useDispatch()

  const [isEmpty, setIsEmpty] = useState({})

  let refs = []

  const handleInput = (e) => {

    const {name, value} = e.target
    dispatch(handleChange({name, value}))

  }

  const handleSubmit = (e) => {

    e.preventDefault()


    const {position, company, jobLocation, jobType, status} = job

    if (!checkEmpty(job,formRowsAddJobPage,setIsEmpty)) {

      dispatch(createJob({position, company, jobLocation, status, jobType }))

    }

  }

  const handleEdit = (e) => {

    e.preventDefault()

    const jobEdited = {position, company, jobLocation, jobType, status}

    const jobId = job.editJobId

    checkEmpty(job, formRowsAddJobPage,setIsEmpty)

    dispatch(editJob({jobId, jobEdited}))

  }


    // this effect update default job location add job page value equal to user location
  
    useEffect(()=> {

      if (isEditing) {
  
        const jobToEdit = jobs.find((job) => job._id === editJobId)
  
        const jobEntries = Object.entries(jobToEdit)

        // this iteration includes job values on each corresponden form field value
  
        jobEntries.map((jobEntry) => {
  
          const validValues = ['position', 'company', 'jobLocation', 'status', 'jobType'];
  
          if (validValues.includes(jobEntry[0])) {
  
  
            dispatch(handleChange({name : jobEntry[0], value: jobEntry[1]}))
  
          }
  
        })
  

      }

    },[isEditing])
    

  return (

    <Wrapper>

      <form  className="form" onSubmit={isEditing ? handleEdit : handleSubmit }>


        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className="form-center">

          {formRowsAddJobPage.map((formRowAddJobPage, index) => {

            const {name} = formRowAddJobPage

            refs.push(name)

            return <FormRow
            
            refName={`${refs[index]}Ref`}

            key={formRowAddJobPage.id} formRow = {formRowAddJobPage} values={job} handleChange={handleInput} isEmptyField={isEmpty[`${name}`]}/>

          })}

          <div className="btn-container">

            <button className="btn btn-block clear-btn" type='button' onClick={() => dispatch(clearValues())}>clear</button>

            <button className="btn btn-block submit-btn" type='submit' disabled={isLoading}>{isLoading ? "please wait...":(isEditing ? "confirm edit": "submit")}</button>

          </div>

        </div>


      </form>

    </Wrapper>
  )
}
export default AddJob