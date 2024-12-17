import React, { useState, useEffect } from "react";
import axios from "axios";

function FindSeat() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [seatDetails, setSeatDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [students, setStudents] = useState([]);

  const api_url = "https://server-u9ga.onrender.com/Student"

  useEffect(() => {
    // Fetch data using axios
    axios
      .get(api_url) // Replace with your API endpoint
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setErrorMessage("Failed to load student data. Please try again later.");
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    // Search for the student in the data
    const student = students.find(
      (student) => student.registration_number === registrationNumber
    );

    if (student) {
      setSeatDetails({
        department: student.department,
        seat_number: student.seat_number,
      });
      setErrorMessage(""); // Clear any previous error message
    } else {
      setSeatDetails(null); // Clear the seat details if no match
      setErrorMessage("Student not found. Please check the registration number.");
    }
  };

  return (
    <>
      <main>
        <section id="student-search" className="section">
          <div id="bg"></div>
          <div>
            <h2>Find Your Seat</h2>
            <form id="search-form" onSubmit={handleSearch}>
              <label htmlFor="regNumber">
                <b>Registration Number:</b>
              </label>
              <input
                type="text"
                id="regNumber"
                placeholder="Enter registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass fa-beat-fade"></i> Search
              </button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {seatDetails && (
              <div className="seat-details">
                <p>
                  <strong>Department:</strong> {seatDetails.department}
                </p>
                <p>
                  <strong>Seat Number:</strong> {seatDetails.seat_number}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default FindSeat;
