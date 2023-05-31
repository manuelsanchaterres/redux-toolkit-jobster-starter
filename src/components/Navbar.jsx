import Wrapper from '../assets/wrappers/Navbar'

import Logo from './Logo';
import { useState, useEffect } from 'react';
import {toggleSidebar, clearStore} from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from '../assets/icons/react-icons';

const Navbar = () => {

  const {user} = useSelector((store) => store.user)

  const [toggleLogout, setIsToggleLogout] = useState(false)

  const dispatch = useDispatch()
  
  return (

    <Wrapper>

      <div className="nav-center">

        <button className="toggle-btn" type='button' onClick={() => dispatch(toggleSidebar())}>

          <FaAlignLeft/>
          
          </button>

      </div>

      <div>

        <Logo />

        <h3 className="logo-text">dashboard</h3>

      </div>


      <div className="btn-container">

        <button className="btn" type='button' onClick={() => setIsToggleLogout(!toggleLogout)}>
          
          <FaUserCircle/>
          
          {user?.name}
          
          <FaCaretDown/>
          
          </button>

        <div className={toggleLogout ? "dropdown show-dropdown" : "dropdown"}>

          <button className="dropdown-btn" type='button' onClick={() => dispatch(clearStore('Logging out...'))}>logout </button>

        </div>

      </div>

    </Wrapper>

  )
}
export default Navbar