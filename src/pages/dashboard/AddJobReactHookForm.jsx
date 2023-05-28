import React from "react";
import { useForm} from "react-hook-form";
import Wrapper from "../../assets/wrappers/ReactHookForm";
import { useDispatch } from "react-redux";
import { createJob } from "../../features/job/jobSlice";
import { formRowsAddJobPage } from "../../utils/constants";

export default function App() {

  const dispatch = useDispatch()

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    dispatch(createJob(data))
    reset({jobLocation : userLocation})

  };

  return (

    <Wrapper>

      <form onSubmit={handleSubmit(onSubmit)}>

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

        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>

      </form>

    </Wrapper>
  );
}