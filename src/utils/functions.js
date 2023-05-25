export const checkEmpty = (emptity, formArray, setIsEmpty) => {

    formArray.map((formArrayItem) => {

      const name = formArrayItem.name

      if (!emptity[`${name}`]) {

        setIsEmpty((prevIsEmpty) => ({ ...prevIsEmpty, [name]: true }));
        

      } else {
        
        setIsEmpty((prevIsEmpty) => ({ ...prevIsEmpty, [name]: false }));

      }


      })
  

}