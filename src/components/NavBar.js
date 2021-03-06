import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-2">
        <NavLink className="brand-logo center" to='/'>super cool game</NavLink>
        <ul id="nav-mobile" className="left">
          <li><img src={require('./assets/guyController.png')} alt="logo" className="iconFix"></img></li>
        </ul>
        <ul id="nav-mobile" className="right">
          <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><a href="/" onClick={props.logOutFunc}>Log Out</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
