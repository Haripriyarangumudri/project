import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ setLoggedInUser }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://server-u9ga.onrender.com/Users";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(API_URL);
      const users = response.data;

      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        setSuccessMessage("Login successful! Redirecting...");
        setErrorMessage("");

        // Pass the logged-in user's email
        setLoggedInUser(user.email);

        setTimeout(() => {
          navigate("/loginhome"); // Redirect to the UserProfile page
        }, 2000);
      } else {
        setErrorMessage("Invalid email or password.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Enter your Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit" className="btn-login">
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <span style={{ cursor: "pointer" }}>
          <Link to="/Signup">Signup</Link>
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
