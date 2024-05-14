import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminUsers.css';
import { BASE_URL } from '../../utils/baseUrl';

const AdminPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/users`)
      .then(response => {
        setUsersData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="admin-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '70vh', marginTop: '3%' }}>
      <h2>All Users Data</h2>
      <table className="users-grid">
        <thead>
          <tr>
            <th>Username</th>
            <th>Quiz Title</th>
            <th>Difficulty</th>
            <th>Total Questions</th>
            <th>Total Answered</th>
            <th>Points Achieved</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <React.Fragment key={index}>
              {user.quizzesTaken.map((quiz, i) => (
                <tr key={`${index}-${i}`}>
                  {i === 0 && <td rowSpan={user.quizzesTaken.length}>{user.username}</td>}
                  <td>{quiz.quizTitle}</td>
                  <td>{quiz.difficulty}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.totalAnswered}</td>
                  <td>{quiz.achievedPoints}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminPage;
