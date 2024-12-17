import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [seatingData, setSeatingData] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Waiting to add students...");
  const [editStudent, setEditStudent] = useState(null);
  const [newSeatNumber, setNewSeatNumber] = useState("");
  const [newStudent, setNewStudent] = useState({
    registration_number: "",
    name: "",
    department: "",
    year: "",
    seat_number: "",
  });

  const api_url = "https://server-u9ga.onrender.com/Student";

  
  useEffect(() => {
    axios.get(api_url)
      .then((response) => {
        setSeatingData(response.data);
        setStatusMessage("Data loaded successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error fetching data: ${error.message}`);
      });
  }, []);

  
  const handleEdit = (student) => {
    setEditStudent(student);
    setNewSeatNumber(student.seat_number);
  };

  
  const handleSave = () => {
    if (!newSeatNumber) {
      setStatusMessage("Seat number cannot be empty!");
      return;
    }

    const updatedStudent = { ...editStudent, seat_number: newSeatNumber };

    axios.put(`${api_url}/${editStudent.id}`, updatedStudent) 
      .then(() => {
        const updatedSeatingData = seatingData.map((student) =>
          student.id === editStudent.id ? updatedStudent : student
        );
        setSeatingData(updatedSeatingData);
        setEditStudent(null);
        setNewSeatNumber("");
        setStatusMessage("Seat number updated successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error updating data: ${error.message}`);
      });
  };

  
  const handleCancel = () => {
    setEditStudent(null);
    setNewSeatNumber("");
  };

  
  const handleDelete = (id) => {
    axios.delete(`${api_url}/${id}`) 
      .then(() => {
        const updatedSeatingData = seatingData.filter(
          (student) => student.id !== id
        );
        setSeatingData(updatedSeatingData);
        setStatusMessage("Student deleted successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error deleting data: ${error.message}`);
      });
  };

  const handleAddStudent = () => {
    if (
      !newStudent.registration_number ||
      !newStudent.name ||
      !newStudent.department ||
      !newStudent.year ||
      !newStudent.seat_number
    ) {
      setStatusMessage("All fields are required to add a new student!");
      return;
    }

    axios.post(api_url, newStudent)
      .then((response) => {
        setSeatingData([...seatingData, response.data]); 
        setNewStudent({
          registration_number: "",
          name: "",
          department: "",
          year: "",
          seat_number: "",
        });
        setStatusMessage("New student added successfully.");
      })
      .catch((error) => {
        setStatusMessage(`Error adding student: ${error.message}`);
      });
  };

  return (
    <>
      <main>
        <section id="admin-dashboard" className="section">
          <h2>Admin Dashboard</h2>

         
          <div className="add-student-section">
            <h4>Add New Student</h4>
            <input
              type="text"
              placeholder="Registration Number"
              id='ip'
              value={newStudent.registration_number}
              onChange={(e) =>
                setNewStudent({ ...newStudent, registration_number: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              id='ip'
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              value={newStudent.department}
              id='ip'
              onChange={(e) =>
                setNewStudent({ ...newStudent, department: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Year"
              value={newStudent.year}
              id='ip'
              onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
            />
            <input
              type="text"
              placeholder="Seat Number"
              value={newStudent.seat_number}
              id='ip'
              onChange={(e) =>
                setNewStudent({ ...newStudent, seat_number: e.target.value })
              }
            />
            <button onClick={handleAddStudent} id='ipbtn'>Add Student</button>
          </div>

         
          <div className="seating-table">
            <h3>Manage Seats</h3>
            <p className="status-message">
              <b>Status: </b>
              {statusMessage}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Reg. No.</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Seat No.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {seatingData.map((student) => (
                  <tr key={student.id}>
                    <td>{student.registration_number}</td>
                    <td>{student.name}</td>
                    <td>{student.department}</td>
                    <td>{student.year}</td>
                    <td>
                      {editStudent && editStudent.id === student.id ? (
                        <input
                          type="text"
                          value={newSeatNumber}
                          onChange={(e) => setNewSeatNumber(e.target.value)}
                          placeholder="Enter new seat number"
                        />
                      ) : (
                        student.seat_number
                      )}
                    </td>
                    <td>
                      {editStudent && editStudent.id === student.id ? (
                        <>
                          <button onClick={handleSave}>Save</button>
                          <button onClick={handleCancel}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(student)}>Edit</button>
                      )}
                      <button onClick={() => handleDelete(student.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
