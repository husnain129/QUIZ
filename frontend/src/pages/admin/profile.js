import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { BASE_URL } from '../../utils/baseUrl';

const ProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 let user = JSON.parse(localStorage.getItem('user'));
let userId = user._id;
console.log("🚀 ~ useEffect ~ userId:", userId)

    axios.get(`${BASE_URL}/user/profile/${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-details">
        <h2>Profile Details</h2>
        {user && (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Joined Date: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      {/* Quizzes Taken Section */}
<div className="quizzes-taken">
  <h2>Quizzes Taken</h2>
  <table className="quiz-grid">
    <thead>
      <tr>
        <th>Quiz Title</th>
        <th>Difficulty</th>
        <th>Achieved Points</th>
        <th>Total Questions</th>
        <th>Total Answered</th>
      </tr>
    </thead>
    <tbody>
      {/* Iterate over quizzes taken data and render each row */}
      {user.quizzesTaken.map((quiz, index) => (
        <tr key={index}>
          <td>{quiz.quizTitle}</td>
          <td>{quiz.difficulty}</td>
          <td>{quiz.achievedPoints}</td>
          <td>{quiz.totalQuestions}</td>
          <td>{quiz.totalAnswered}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ProfilePage;
