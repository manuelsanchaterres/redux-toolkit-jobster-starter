import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
// import Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from '../components/index'

const Landing = () => {

  return (
    
    <>

      <nav>

        <Logo />

      </nav>

      <div className="container page">

        {/* info */}

        <div className="info">

          <h1>job <span>tracking</span> app</h1>
          <p>I'm baby irony celiac 3 wolf moon, plaid sus meggings shoreditch fit actually sustainable mlkshk meh. Intelligentsia mukbang scenester tilde squid vegan offal af fit taiyaki. Single-origin coffee humblebrag try-hard gochujang, tofu williamsburg health goth master cleanse umami mukbang paleo shoreditch edison bulb.</p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>

        </div>

        <img src={main} alt="job hunt" className="img main-img" />
        
      </div>

    </>
  )
}
export default Landing