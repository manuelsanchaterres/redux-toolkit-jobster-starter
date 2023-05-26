
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

export const authHeader = (thunkAPI) => {

  return ({
    
    headers: {

      Authorization: `Bearer ${thunkAPI.getState().user.user.token}` 

    }

  })

  

}

export const redirectUser = (redirectUri) => {

  window.location.replace(redirectUri)

}
