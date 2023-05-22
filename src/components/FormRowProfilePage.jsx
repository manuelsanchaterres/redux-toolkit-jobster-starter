import { useEffect, useRef } from "react"
import Wrapper from "../assets/wrappers/FormRow"

const FormRowProfilePage = ({formRowProfilePage, value, handleChange, refName, isEmptyField}) => {

    const {id, name, type, labelText} = formRowProfilePage

    refName = useRef()

    // console.log(isEmptyField);

    useEffect(()=> {

      if (isEmptyField) {

        refName.current.focus();
        refName.current.style.border = "3px solid red";
  
      } else  {
  
        refName.current.blur();
        refName.current.style.border = null;
  
      }
  

    },[isEmptyField])

  
  
  return (
    
    <Wrapper >

      <div className="form-row">

        {isEmptyField ? <p>*please fill {name} field</p> : null}

        <label htmlFor={name} className="form-label">{labelText || name}</label>
        <input 
        
        ref= {refName}
        
        type={type} name={name} onChange={(event) => handleChange(event)}  value={value} className="form-input"/>

      </div>

    </Wrapper >
  )
}
export default FormRowProfilePage