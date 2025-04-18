import React, { useEffect, useState } from "react";
import { fetchStudents, deleteStudent } from "../../api/user"; // Import the specific API functions
import './ViewStudents.css';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students when the component loads
    const fetchAllStudents = async () => {
      try {
        const data = await fetchStudents(); // Directly use fetchStudents API
        setStudents(data); // Assuming the API returns an array of students
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchAllStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id); // Directly use deleteStudent API
      setStudents(students.filter((student) => student.id !== id));
      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="view-students-container">
      <h1>View & Manage Students</h1>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudents;
