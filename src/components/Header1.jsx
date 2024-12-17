import React from 'react'
import { NavLink } from 'react-router-dom'

function Header1() {
  return (
    <>
        <header1>
        <nav class="navbar navbar-expand-lg" id="nav">
            <img src="./src/assets/images/logo.jpeg" alt="" id="logo"/>
            <a class="navbar-brand" href="/" id="title">Convocation Seating Arrangement</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <NavLink to="/Login"><button id='navbtn1'>Login</button></NavLink>  
                </li>
                {/* <li class="nav-item">
                    <NavLink to="/Signup"><button id='navbtn2'>Signup</button></NavLink>
                </li> */}
              </ul>
            </div>
          </nav>
      </header1>
    </>
  )
}

export default Header1
