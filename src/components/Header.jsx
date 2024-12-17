// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./Header.css";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
  

//   return (
//     <header>
//       <nav className="navbar" id="nav">
//         <div className="container-fluid">
//           <img src="./src/assets/images/logo.jpeg" alt="Logo" id="logo" />
//           <a className="navbar-brand" href="#" id="title">
//             Convocation Seating Arrangement
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={toggleMenu}
//             aria-expanded={menuOpen}
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//         </div>
//       </nav>

//       {/* Side Card Menu */}
//       <div
//         className={`card menu-card ${menuOpen ? "menu-open" : ""}`}
//         style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}
//       >
//         <div className="card-body">
//           <ul className="list-unstyled">
//             <li>
//               <NavLink className="nav-link" to="/loginhome" onClick={toggleMenu}>
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className="nav-link" to="/findseat" onClick={toggleMenu}>
//                 Find Seat
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className="nav-link" to="/visualmap" onClick={toggleMenu}>
//                 Map
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className="nav-link" to="/admindashboard" onClick={toggleMenu}>
//                 Admin Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <NavLink className="nav-link" to="/profile" onClick={toggleMenu}>
//                 Profile
//               </NavLink>
//             </li>
//             <li>
//                 <NavLink to="/"  className="nav-link" onClick={toggleMenu}>
//                   <button id='logoutbtn'>Logout</button>
//                 </NavLink>  
//             </li>
            
            
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAdminDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); 
    } else {
      navigate("/admindashboard"); 
    }
  };

  return (
    <header>
      <nav className="navbar" id="nav">
        <div className="container-fluid">
          <img src="./src/assets/images/logo.jpeg" alt="Logo" id="logo" />
          <a className="navbar-brand" href="#" id="title">
            Convocation Seating Arrangement
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Side Card Menu */}
      <div
        className={`card menu-card ${menuOpen ? "menu-open" : ""}`}
        style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="card-body">
          <ul className="list-unstyled">
            <li>
              <NavLink className="nav-link" to="/loginhome" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/findseat" onClick={toggleMenu}>
                Find Seat
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/visualmap" onClick={toggleMenu}>
                Map
              </NavLink>
            </li>
            <li>
              <button className="nav-link btn-link" onClick={handleAdminDashboardClick}>
                Admin Dashboard
              </button>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile" onClick={toggleMenu}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login" onClick={toggleMenu}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
