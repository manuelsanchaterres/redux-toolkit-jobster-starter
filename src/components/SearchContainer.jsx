import { useState, useMemo } from 'react';
import { FormRow} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { formRowsAllJobsPage } from '../utils/constants';
import { checkEmpty } from '../utils/functions';
import {handleChange, clearValues} from '../features/allJobs/AllJobsSlice';

const SearchContainer = () => {

 const filterState = useSelector((store) => store.allJobs)
 const {search, searchStatus, searchType, sort} = filterState

 const {isLoading} = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  const [isEmpty, setIsEmpty] = useState({})
  const [localSearch, setLocalSearch] = useState('')

  let refs = []

  const handleInput = (e) => {

    let {name, value} = e.target

    // if (name === 'limit') {

    //   value = new Number(value)
    // }
    dispatch(handleChange({name, value}))

  }

  const debounce = () => {

    let timeoutId;

    return (e) => {

      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(()=> {

        dispatch(handleChange({name: e.target.name, value: e.target.value}))

      }, 1000)
  
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (

    <Wrapper>

      <form  className="form" 
            
      >


        <h4>search form</h4>

        <div className="form-center">

          {formRowsAllJobsPage.map((formRowAllJobsPage, index) => {

            const {name} = formRowAllJobsPage

            refs.push(name)

            return <FormRow
            
            refName={`${refs[index]}Ref`}

            key={formRowAllJobsPage.id} formRow = {formRowAllJobsPage} localSearch={localSearch}  optimizedDebounce= {optimizedDebounce} values={filterState} handleChange={handleInput} isEmptyField={isEmpty[`${name}`]}/>

          })}

          <div className="btn-container">

            <button className="btn btn-block clear-btn" type='button' onClick={() => [dispatch(clearValues()), setLocalSearch('')]} disabled={isLoading}>clear filters</button>

          </div>

        </div>


      </form>

    </Wrapper>
  )
}
export default SearchContainer