import { useState } from 'react';
import { FormRow} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { formRowsProfilePage } from '../../utils/constants';
import { updateUser } from '../../features/user/userSlice';
import { checkEmpty } from '../../utils/functions';

const Profile = () => {

  const {isLoading, user} = useSelector((store) => store.user)

  const [userData, setUserData] = useState({

    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",

  })

  const dispatch = useDispatch()

  const [isEmpty, setIsEmpty] = useState({})

  let refs = []

  const handleChange = (e) => {

    const {name, value} = e.target

    setUserData({...userData, [name]: value})

  }

  const handleUpdate = (e) => {

    e.preventDefault()

    checkEmpty(userData,formRowsProfilePage,setIsEmpty)

    dispatch(updateUser(userData))
    

  }


  return (
    <Wrapper>

      <form  className="form" onSubmit={handleUpdate}>


        <h3>profile</h3>

        <div className="form-center">

        {formRowsProfilePage.map((formRowProfilePage, index) => {

          const {name} = formRowProfilePage

          refs.push(name)

          return <FormRow
          
          refName={`${refs[index]}Ref`}

          key={formRowProfilePage.id} formRow = {formRowProfilePage} values={userData} handleChange={handleChange} isEmptyField={isEmpty[`${name}`]}/>

        })}


        <button className="btn btn-block" type='submit' disabled={isLoading}>{isLoading ? "Please Wait...":"save changes"}</button>

        </div>


      </form>

    </Wrapper>
  )
}
export default Profile