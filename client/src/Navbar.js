import React from 'react'
import Logo from './Pinly_Nav.png';
import { logoutUser } from './api/auth';
import { useHistory, Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div className="columns is-centered is-mobile navbar mb-0">
      <div className="column py-2"></div>
      <div className="column py-2 has-text-centered">
        <Link to="/"><img src={Logo} alt="Pinly Logo" className="ml-2 logo-text" /></Link>
      </div>
      <div className="column py-2 has-text-right">
        <p className="is-size-3"><Link to="/user"><i className="fa fa-info-circle mt-4 mr-5 has-text-danger"></i></Link></p>
      </div>
    </div>
  )
}
