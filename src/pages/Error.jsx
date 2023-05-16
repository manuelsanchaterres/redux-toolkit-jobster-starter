import Wrapper from "../assets/wrappers/ErrorPage"
import ErrorImage from '../assets/images/not-found.svg'
import { Link } from "react-router-dom"

const Error = () => {

  return (
    
    <Wrapper className="full-page">

      <div>

        <img src={ErrorImage} alt="not found" />

        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>

      </div>
    </Wrapper>

  )
}
export default Error