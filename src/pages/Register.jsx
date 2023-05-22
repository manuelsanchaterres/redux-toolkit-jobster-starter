import Wrapper from "../assets/wrappers/RegisterPage"
// import { Link } from "react-router-dom"
import { Logo, FormRow } from "../components"
import { useEffect, useState } from "react"
import { formRows } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { checkEmpty } from '../utils/functions';

// import { toast } from "react-toastify"


const initialState =  {

  name: '',
  email: '',
  password: '',
  isMember:false,
  formRows: [],

}
const Register = () => {


  const [values, setValues] = useState(initialState)
  const [isEmpty, setIsEmpty] = useState({})
  const navigate = useNavigate()
  let {user, isLoading} = useSelector((store) => store.user)

  const dispatch = useDispatch()

  let refs = []

  const handleChange = (event) => {

    event.preventDefault()

    const { name, value } = event.currentTarget;

    // Update values local state object
    const newValues = {...values, [name]: value}

    setValues(newValues)
    
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    
    const {name, email, password, isMember} = values

    checkEmpty(values,formRows,setIsEmpty)

    if (values.isMember) {

      user = {email, password}

      dispatch(loginUser(user))
  
      return

    } else {

      user = {name, email, password}

      dispatch(registerUser(user))
      
      if (user.token) {
        
        navigate('/')
      }
  
      return
    }

  }

  const toggleMember = () => {

    setValues({...values, isMember: !values.isMember})

  }


  useEffect(() => {

    if (user?.token) {

      navigate('/')
  
    }
    
  }, [user?.token])



  

  /* this useEffect mutates the formRows array to show or not show "name" field */

  useEffect(() => {

    if (values.isMember) {

      const newFormRows = values.formRows.filter((formRow) => formRow.name !== 'name')
  
      return setValues({...values, formRows: newFormRows})
  
    } else {

      return setValues({...values, formRows: formRows})

    }
  
  }, [values.isMember])

  return (

    <Wrapper className="full-page">
      
      <form className="form" onSubmit={handleSubmit}>

        <Logo />

        <h3>{values.isMember ? "Sign In" : "Sign Up"}</h3>

        
        {/* form field */}
        
        {values.formRows.map((formRow, index) => {

          const {name} = formRow

          refs.push(name)

          return <FormRow 
          
          refName={`${refs[index]}Ref`}

          key={formRow.id} formRow = {formRow} values={values} handleChange={handleChange} handleSubmit={handleSubmit} isEmptyField={isEmpty[`${name}`]}/>

        })}

        <button type="submit" className="btn btn-block" disabled={isLoading}> {isLoading ? 'loading...':'submit'}</button>

        <p>{values.isMember ? "Not a member yet ?": "Are you already a member?"  } <button type="button" className="member-btn" onClick={toggleMember}>{values.isMember ? "Sign Up": "Sign In" }</button></p>

      </form>


    </Wrapper>

  )
}
export default Register