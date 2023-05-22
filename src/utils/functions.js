export const checkEmpty = (user, formArray, setIsEmpty) => {

    formArray.map((formArrayItem) => {

        const name = formArrayItem.name
  
        if (!user[`${name}`]) {
  
          setIsEmpty((prevIsEmpty) => ({ ...prevIsEmpty, [name]: true }));
  
          return
  
        } else {
  
          setIsEmpty((prevIsEmpty) => ({ ...prevIsEmpty, [name]: false }));
  
  
        }
      })
  

}