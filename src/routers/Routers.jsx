// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Home from "../pages/Home";
// import AdminDashboard from "../pages/AdminDashboard";
// import FindSeat from "../pages/FindSeat";
// import VisualMap from "../pages/VisualMap";
// import SignUpForm from "../pages/SignUpForm";
// import LoginForm from "../pages/LoginForm";
// import LandingPage from "../pages/LandingPage";
// import UserProfile from "../pages/UserProfile";

// function Routers() {
//   const [userEmail, setUserEmail] = useState(null);

//   return (
//     <Router>
//       <MainLayout isLoggedIn={!!userEmail}>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/Signup" element={<SignUpForm />} />
//           <Route
//             path="/Login"
//             element={<LoginForm setLoggedInUser={(email) => setUserEmail(email)} />}
//           />
//           <Route path="/loginhome" element={<Home />} />
//           <Route path="/admindashboard" element={<AdminDashboard />} />
//           <Route path="/findseat" element={<FindSeat />} />
//           <Route path="/visualmap" element={<VisualMap />} />
//           <Route
//             path="/profile"
//             element={
//               userEmail ? (
//                 <UserProfile userEmail={userEmail} />
//               ) : (
//                 <div>Please log in first.</div>
//               )
//             }
//           />
//         </Routes>
//       </MainLayout>
//     </Router>
//   );
// }

// export default Routers;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import FindSeat from "../pages/FindSeat";
import VisualMap from "../pages/VisualMap";
import SignUpForm from "../pages/SignUpForm";
import LoginForm from "../pages/LoginForm";
import LandingPage from "../pages/LandingPage";
import UserProfile from "../pages/UserProfile";

function Routers() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null);

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  const PrivateRoute = ({ children }) => {
    return userEmail ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <MainLayout isLoggedIn={!!userEmail} onLogout={handleLogout}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm setLoggedInUser={handleLogin} />} />

          {/* Protected Routes */}
          <Route
            path="/admindashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/loginhome"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/findseat"
            element={
              <PrivateRoute>
                <FindSeat />
              </PrivateRoute>
            }
          />
          <Route
            path="/visualmap"
            element={
              <PrivateRoute>
                <VisualMap />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile userEmail={userEmail} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default Routers;
