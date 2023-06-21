import { useEffect, useState } from 'react';
import { FormRow, JobInfo} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { formRowsAddJobPage } from '../../utils/constants';
import { checkEmpty } from '../../utils/functions';
import { createJob,editJob} from '../../features/job/jobSlice';
import { useForm} from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';

const AddJob = () => {

  const {isLoading, position, company, jobLocation, jobType, status, isEditing, editJobId, allJobsArray} = useSelector((store) => store.job)
  const {jobs} = useSelector((store) => store.allJobs)
  const job = useSelector((store) => store.job)
  const userLocation = useSelector((store) => store.user.user.location)
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onSubmit = (data) => {

    if (isEditing) {

      dispatch(editJob({editJobId, data}))

      if (editJob.fulfilled) {

        setTimeout(() => {
          reset({position: "", company: "", jobLocation : userLocation})
          navigate('/all-jobs')
        }, 6500);

      }


    } else {

      dispatch(createJob(data))

      if (createJob.fulfilled) {
  
        reset({position: "", company: "", jobLocation : userLocation})
        
        // setTimeout(() => {
        //   navigate('/all-jobs')
        // }, 6500);

      }
  

    }

  };


  // const handleEdit = (e) => {

  //   e.preventDefault()

  //   const jobEdited = {position, company, jobLocation, jobType, status}

  //   const jobId = job.editJobId

  //   checkEmpty(job, formRowsAddJobPage,setIsEmpty)

  //   dispatch(editJob({jobId, jobEdited}))

  // }


  // this effect update default job location add job page value equal to user location


  useEffect(() => {

    if (isEditing === true) {

      reset({position: job.position, company: job.company, jobLocation: job.jobLocation, status: job.status, jobType: job.jobType})
  
    } else {
  
      reset({position: "", company: "", jobLocation: userLocation, status: 'pending', jobType: 'full-time'})
  
    }
  
  }, [isEditing])

    

  return (

    <Wrapper>

      <form  className="form" onSubmit={handleSubmit(onSubmit)}>


        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className="form-center">

          {formRowsAddJobPage.map((item) => {

            const {id, name, type, labelText, required, validate, options} = item

            // console.log(validate);

            if (type === 'select') {

              return (
              
                <div key={id} className="form-row">

                  <label className="form-label">{labelText}</label>

                  <select className="form-input" 
                  
                    {...register(name, {
                      required,
                      validate
                    })}

                  >

                    {options.map((option) => (

                      <option key={option.value} value={option.value}>

                        {option.label}

                      </option>

                    ))}

                  </select>              

                </div>

              )

            }
            else {

              return (
              
                <div key={id} className="form-row">

                  <label className="form-label">{labelText}</label>

                  <input 
                    type={type}
                    name={name}
                    className="form-input"
                    {...register(name, {
                      required,
                      validate
                    })}
                  />

                  {errors[`${name}`]?.type === "required" && (
                    <p className="errorMsg">{labelText} is required</p>
                  )}
                  {errors[`${name}`]?.type === "checkLength" && (

                    <p className="errorMsg">{labelText} must be be at least 6 characters long</p>

                  )}

                  {errors[`${name}`]?.type === "matchPattern" && (

                  <p className="errorMsg">{labelText} does not match pattern</p>

                  )}


                </div>

              )

            }

          })}

          <div className="btn-container">

            <button className="btn btn-block clear-btn" type='button' onClick={() => reset({position: "", company: "", jobLocation : userLocation})}>clear</button>

            <button className="btn btn-block submit-btn" type='submit' disabled={isLoading}>{isLoading ? "please wait...":(isEditing ? "confirm edit": "submit")}</button>
          </div>

        </div>


      </form>

      {!isEditing && <div className="btn-container-back-button"><Link to='/all-jobs' className='btn btn-block back-btn'>Back all jobs</Link></div>}


    </Wrapper>
  )
}
export default AddJob