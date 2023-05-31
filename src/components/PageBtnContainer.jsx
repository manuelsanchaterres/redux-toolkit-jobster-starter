import { HiChevronDoubleLeft, HiChevronDoubleRight } from '../assets/icons/react-icons';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/AllJobsSlice';

const PageBtnContainer = () => {

  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({length: numOfPages}, (_, index) => {

    return index + 1
  })

  const nextPage = () => {

    if (page < numOfPages) {

      dispatch(changePage(page + 1))

    }

  }
  const prevPage = () => {

    if (page > 1) {

      dispatch(changePage(page - 1))

    }

  }

  return (
    <Wrapper>

      <div className='page-controls-btn'>
        
      <button type='button' className="prev-btn" onClick={prevPage}>
        
        <HiChevronDoubleLeft/>
        
        prev</button>
      <button type='button' className="prev-btn" onClick={() => dispatch(changePage(1))}>

        <HiChevronDoubleLeft/>
        
        first page</button>

      </div>

      <div className="btn-container">

        {pages.map((pageNumber) => {

          return <button 
          
          type='button' 
          
          className={pageNumber === page ? 'pageBtn active': 'pageBtn'} 
          key = {pageNumber} 
          onClick={() => dispatch(changePage(pageNumber))}
          >
            
            {pageNumber}
          
          </button>

        })}

      </div>
      
      <div className='page-controls-btn'>
      <button type='button' className="next-btn" onClick={() => dispatch(changePage(numOfPages))}>
        
        <HiChevronDoubleRight/>
        
        last page</button>

      <button type='button' className="next-btn" onClick={nextPage}>
        
        <HiChevronDoubleRight/>
        
        next</button>
      </div>
    </Wrapper>
  )
}
export default PageBtnContainer