import { FaLocationArrow, FaCalendarAlt, FaBriefcase} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch,useSelector } from 'react-redux';
import JobInfo from './JobInfo';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { deleteJob, setEditJob } from '../features/job/jobSlice';


const Job = ({_id, position, company, jobLocation, jobType, createdAt, status}) => {

  const dispatch = useDispatch()

  const date = dayjs(createdAt).format('MMM D, YYYY')


  return (

    <Wrapper>

      <header>
        <div className="main-icon">{company.charAt(0)}</div>

        <div className="info">

          <h5>{position}</h5>
          <p>{company}</p>

        </div>

        <div className="content">

          <div className="content-center">

            <JobInfo 
            icon={<FaLocationArrow/>} 
            text={jobLocation} />
            <JobInfo 
            icon={<FaCalendarAlt/>} 
            text={date} />
            <JobInfo 
            icon={<FaBriefcase/>} 
            text={jobType} />

            <div className={`status ${status}`}>{status}</div>

          </div>

        </div>

        <footer>

          <div className="actions">

            <Link 
            to='/add-job' 
            className='btn edit-btn'   onClick={() => {
              dispatch(
                setEditJob({
                  editJobId: _id,
                  position,
                  company,
                  jobLocation,
                  jobType,
                  status,
                })
              );
            }}
          >Edit</Link>
            <button type="button" className='btn delete-btn' onClick={() => {dispatch(deleteJob(_id))}}>delete</button>

          </div>

        </footer>
      </header>

    </Wrapper>
  )
}
export default Job