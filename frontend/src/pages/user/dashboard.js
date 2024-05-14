import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/UserDashboard.css";
import Card from "./Card";

function UserDashboard() {
const [questions, setQuestions] = useState([
  
  // Add more questions as needed
]);  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/questions");
        console.log("🚀 ~ fetchData ~ response:", response);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (question) => {
    console.log("🚀 ~question sent to /main/quiz", question)
    navigate("/main/quiz", { state: { question } });
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from local storage
    navigate('/login'); // Redirect to login page
  };
  return (
    <div className="dasboard__container">
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            width: "100vw",
            height: "10vh",
            padding: "40px",
          }}
        >
          <div className="">
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <p className="nav_item">Quiz</p>
              <p className="nav_item">Profile</p>
            </div>
          </div>
        </div>

        <div className="container__card_wrapper">
          <h2>Welcome to your dashboard</h2>
          <div className="">
            {questions?.map((question, index) => (
              <Card
                key={index}
                question={question}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="logout" style={{ position: 'absolute', bottom: '0', left: '0' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserDashboard;
