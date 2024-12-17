import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Ensure this file is created and styles are added

const UserProfile = ({ userEmail }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const API_URL = "https://server-u9ga.onrender.com/Student";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL);
        const students = response.data;
        const currentUser = students.find((student) => student.email === userEmail);

        if (currentUser) {
          setUser(currentUser);
          setFormData(currentUser);
        } else {
          setError("User data not found. Please check your login details.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    if (userEmail) {
      fetchUserData();
    } else {
      setError("No email provided. Please log in first.");
    }
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: imageUrl });
    }
  };

  const saveChanges = async () => {
    try {
      setError(null);
      setSuccessMessage(null);

      const response = await axios.put(`${API_URL}/${user.id}`, formData);
      if (response.status === 200) {
        setUser(formData);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <img
        src={formData?.profilePicture || "https://via.placeholder.com/100"}
        alt="Profile"
      />
      <div className="info">
        {isEditing ? (
          <div>
            <label>
              Student Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Year:
              <span className="non-editable">{formData.year}</span>
            </label>
            <label>
              Registration Number:
              <span className="non-editable">{formData.registration_number}</span>
            </label>
            <button onClick={saveChanges}>Save</button>
            <button className="cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Registration Number:</strong> {user.registration_number}
            </p>
            <p>
              <strong>Student Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Year:</strong> {user.year}
            </p>
            
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default UserProfile;
