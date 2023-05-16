
const FormRow = ({formRow, values, handleChange}) => {

    const {id, name, type, labelText} = formRow

    // console.log(values[`${name}`]);

  return (

    <div className="form-row">

        <label htmlFor={name} className="form-label">{labelText}</label>
        <input type={type} name={name} onChange={(e) => handleChange(e, name)}  value={values[`${name}`]} className="form-input"/>

    </div>

  )
}
export default FormRow