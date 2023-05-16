import Wrapper from "../assets/wrappers/RegisterPage"
// import { Link } from "react-router-dom"
import { Logo, FormRow } from "../components"
import { useEffect, useState } from "react"
import { formRows } from "../utils/constants"

const initialState =  {

  name: '',
  email: '',
  password: '',
  isMember:true,

}
const Register = () => {


  const [values, setValues] = useState(initialState)

  const handleChange = (e, name) => {

    e.preventDefault()
    
    const newValues = {...values, [`${name}`]: e.target.value}

    setValues(newValues)
    
  }

  const handleSubmmit = async (e) => {

    e.preventDefault()
    
  }


  return (

    <Wrapper className="full-page">
      
      
      <form className="form" onSubmit={handleSubmmit}>

        <Logo />

        <h3>login</h3>

        {/* form field */}
        
        {formRows.map((formRow) => {

          return <FormRow key={formRow.id} formRow = {formRow} values={values} handleChange={handleChange} />

        })}

        <button type="submit" className="btn btn-block"> submit</button>

      </form>


    </Wrapper>

  )
}
export default Register