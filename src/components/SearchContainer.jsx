import { useEffect, useState } from 'react';
import { FormRow} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { formRowsAllJobsPage } from '../utils/constants';
import { checkEmpty } from '../utils/functions';
import {handleChange, clearValues } from '../features/allJobs/AllJobsSlice';

const SearchContainer = () => {

 const filterState = useSelector((store) => store.allJobs)
 const {search, searchStatus, searchType, sort} = filterState

  const dispatch = useDispatch()

  const [isEmpty, setIsEmpty] = useState({})

  let refs = []

  const handleInput = (e) => {

    const {name, value} = e.target

    dispatch(handleChange({name, value}))

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const {position, company, jobLocation, jobType, status} = jobData

    if (!checkEmpty(jobData,formRowsAllJobsPage,setIsEmpty)) {

      dispatch(createJob({position, company, jobLocation, status, jobType }))

    }

    

  }

  return (

    <Wrapper>

      <form  className="form" onSubmit={handleSubmit}>


        <h3>all jobs</h3>

        <div className="form-center">

          {formRowsAllJobsPage.map((formRowAllJobsPage, index) => {

            const {name} = formRowAllJobsPage

            refs.push(name)

            return <FormRow
            
            refName={`${refs[index]}Ref`}

            key={formRowAllJobsPage.id} formRow = {formRowAllJobsPage} values={filterState} handleChange={handleInput} isEmptyField={isEmpty[`${name}`]}/>

          })}

          <div className="btn-container">

            <button className="btn btn-block clear-btn" type='button' onClick={() => dispatch(clearValues())}>clear filters</button>

          </div>

        </div>


      </form>

    </Wrapper>
  )
}
export default SearchContainer