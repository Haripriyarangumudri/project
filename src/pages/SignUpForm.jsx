
import React, { useState } from "react";
import axios from "axios";

const SignUpForm = ({ setIsLogin, users, setUsers }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "https://server-u9ga.onrender.com/Users";

  const addUser = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newUser.name) errors.name = "Name is required.";
    if (!newUser.email) errors.email = "Email is required.";
    else if (!/\S+@\S+/.test(newUser.email)) errors.email = "Enter a valid email.";
    if (!newUser.password) errors.password = "Password is required.";
    else if (newUser.password.length < 3) errors.password = "Password must be at least 3 characters long.";
    if (!newUser.confirmPassword) errors.confirmPassword = "Confirm Password is required.";
    else if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords do not match.";

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.get(API_URL);
      const usersList = Array.isArray(response.data) ? response.data : [];
      const existingUser = usersList.find((user) => user.email === newUser.email);

      if (existingUser) {
        setErrorMessage("Email already exists. Please use a different email.");
        setSuccessMessage("");
        return;
      }

      const newUserResponse = await axios.post(API_URL, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });

      if (newUserResponse.status === 201) {
        setUsers([...users, newUserResponse.data]);
        setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
        setValidationErrors({});
        setSuccessMessage("Signup successful, Please login");

        setTimeout(() => {
          setIsLogin(true);
        }, 2000);

        setErrorMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("Signup successful but received an unexpected response.");
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrorMessage("");
      setSuccessMessage("Signup successful.");
    }
  };

  return (
    <form className="signup-form" onSubmit={addUser}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Enter your Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm your Password"
          value={newUser.confirmPassword}
          onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
        />
        {validationErrors.confirmPassword && <p className="error-message">{validationErrors.confirmPassword}</p>}
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit" className="btn-login">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;


