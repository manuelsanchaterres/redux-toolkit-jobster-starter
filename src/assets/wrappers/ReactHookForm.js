import styled from 'styled-components'

const Wrapper = styled.div`

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    width: 60%;
    margin: 10px auto;
  }
  
  .errorMsg {
    max-width: 350px;
    color: #f21e08;
    padding: 2px 0;
    margin-top: 2px;
    font-size: 14px;
    font-weight: 300;
  }
  
  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  .form-control label {
    width: 20%;
    padding-right: 20px;
    margin-bottom: 5px;
  }
  
  .form-control input[type="text"],
  .form-control input[type="password"] {
    width: 40%;
    padding: 5px;
  }
  
  button {
    max-width: 150px;
    padding: 5px 10px;
  }
  
  @media screen and (max-width: 600px) {
    body {
      width: 90%;
    }
  
    .errorMsg {
      max-width: 100%;
    }
  
    .form-control {
      flex-direction: column;
    }
  
    .form-control input[type="text"],
    .form-control input[type="password"] {
      width: inherit;
    }
  }
`

export default Wrapper
